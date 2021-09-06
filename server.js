
// imports
const express = require("express");     // server utilities
const ip =      require("ip");          // ip stuff
const fs = require('fs');               // read token
const { GraphQLClient } = require('graphql-request');

// global variables
const PORT = 8000;          // port of the server, don't change unless you know what you are doing
var tournament = {          // tournament info, sent to the overlay whenever called
    "p1_id": "",
    "p1_name": "",
    "p1_score": 0,
    "p1_bracket": "",
    "p2_id": "",
    "p2_name": "",
    "p2_score": 0,
    "p2_bracket": "",
    "set_name": "",
    "event_name": "",
    "c1_id": "",
    "c1_name": "",
    "c1_socials": [],
    "c2_id": "",
    "c2_name": "",
    "c2_socials": [],
    "tournament_name": "",
    "tournament_date": ""
}

var tournament_info = {
    "name": "",             // name of the tournament
    "slug": "",             // slug (url)
    "date": "",             // date
    "participants": [],     // participants. this is an array of dictionaries, with each dictionary representing a player with their name, tag, internal id, and social media
    "events": []            // list of events with the participants of each event. participants are just a list of ids
};

async function get_tournament(tournament_slug) {
    const query = `
      query GetTournament($slug: String) {
        tournament(slug: $slug) {
          name
          slug
          shortSlug
          startAt
          participants(query: {
            page: 1
            perPage: 500
          }) {
            nodes {
              id
              gamerTag
              prefix
              user {
                name
                discriminator
              }
            }
          }
          events {
            name
            slug
            videogame {
              displayName
              slug
            }
            entrantSizeMin
            entrants(query: {
              page: 1
              perPage: 500
            }) {
              nodes {
                participants {
                  id
                }
              }
            }
          }
        }
      }
    `;
    const smashgg_url = 'https://api.smash.gg/gql/alpha';
    const key = fs.readFileSync('SMASHGG_TOKEN.txt', 'utf8').trim();
    const graphQLClient = new GraphQLClient(smashgg_url, {
        headers: { authorization: `Bearer ${key}` },
    });
    const tournamentData = await graphQLClient.request(query, {
        slug: tournament_slug
    });
    parse_tournament_data(tournamentData.tournament);
}

function get_tag(participant) {
    let str = ""
    if (participant.prefix != null && participant.prefix != "") {
        str += participant.prefix + " | " + participant.gamerTag;
    }
    else {
        str += participant.gamerTag;
    }
    return str;
}

function parse_tournament_data(tournament) {
    tournament_info["name"] = tournament.name;
    if (tournament.shortSlug != null) {
        tournament_info["slug"] = tournament.shortSlug;
    }
    else {
        tournament_info["slug"] = tournament.slug;
    }
    var d = new Date(tournament.startAt * 1000);
    const year = d.getFullYear()
    tournament_info["date"] = (eval(d.getMonth()) + 1) + "/" + (eval(d.getDate())) + "/" + year.toString().substring(2, 4);
    tournament_info["participants"].length = 0;
    tournament_info["events"].length = 0;
    for (var i = 0; i < tournament.events.length; i++) {
        tournament_info["events"].push({ "name": tournament.events[i].name, "entrants": [], "max_team_size": tournament.events[i].entrantSizeMin });
        for (var j = 0; j < tournament.events[i].entrants.nodes.length; j++) {
            var message = [];
            for (var k = 0; k < tournament.events[i].entrants.nodes[j].participants.length; k++) {
                message.push(tournament.events[i].entrants.nodes[j].participants[k].id);
            }
            tournament_info["events"][i]["entrants"].push(message);
        }
    }
    for (const p of tournament.participants.nodes) {
        if (p.user != null) {
            tournament_info["participants"].push({ "id": p.id, "tag": p.gamerTag, "name": p.user.name, "socials": p.user.authorizations });
        }
        else {
            tournament_info["participants"].push({ "id": p.id, "tag": p.gamerTag, "name": null, "socials": null });
        }
    }
    tournament_info["participants"] = tournament_info["participants"].sort(function(a, b) {
        var nameA = a["tag"].toUpperCase();
        var nameB = b["tag"].toUpperCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
    });
    for (const p of tournament.participants.nodes) {
        for (const player of tournament_info["participants"]) {
            if (p.id == player["id"]) {
                player["tag"] = get_tag(p);
            }
        }
    }
}

// get user?

// setup server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get
app.get("/info", function(request, response) {
    response.send(tournament);
});
app.get("/tournament", function(request, response) {
    response.send(tournament_info);
});
app.get("/tool", function(request, response) {
    response.sendFile("/assets/tool/tool.html", { root: process.cwd() });
});
app.get("/tool/alt", function(request, response) {
    response.sendFile("/assets/tool/offline_tool.html", { root: process.cwd() });
});

// post
app.post("/", function(request, response) {
    tournament = request.body;  // update tournament info with what is given from the tool
});
app.post("/tournament", function(request, response) {
    get_tournament(request.body.tournament_slug);  // update tournament info with what is given from the tool
});

// start server
app.listen(PORT, () => {
    console.log("Listening at localhost:" + PORT + "...\n");
    console.log("Stream Tool:           http://" + ip.address() + ":" + PORT + "/tool/");
    console.log("Alternate Stream Tool: http://" + ip.address() + ":" + PORT + "/tool/alt/\n");
    console.log("Game Overlay:          " + process.cwd() + "\\assets\\overlays\\game\\index.html");
    console.log("Transition:            " + process.cwd() + "\\assets\\overlays\\transition\\index.html");
    console.log("Break:                 " + process.cwd() + "\\assets\\overlays\\break\\index.html");
});
