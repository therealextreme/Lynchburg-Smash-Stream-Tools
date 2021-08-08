
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
    "name": "",
    "slug": "",
    "date": 0,
    "participants": [],
    "events": []
};

async function get_tournament(tournament_slug) {
    const query = `
      query GetTournament($slug: String) {
        tournament(slug: $slug) {
          name
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
    tournament_info["slug"] = tournament.shortSlug;
    var d = new Date(tournament.startAt * 1000);
    const year = d.getFullYear()
    tournament_info["date"] = (eval(d.getMonth()) + 1) + "/" + (eval(d.getDate())) + "/" + year.toString().substring(2, 4);
    tournament_info["participants"].length = 0;
    tournament_info["events"].length = 0;
    for (const p of tournament.participants.nodes) {
        if (p.user != null) {
            tournament_info["participants"].push({ "id": p.id, "tag": get_tag(p), "name": p.user.name, "socials": p.user.authorizations });
        }
        else {
            tournament_info["participants"].push({ "id": p.id, "tag": get_tag(p), "name": null, "socials": null });
        }
    }
    for (i = 0; i < tournament.events.length; i++) {
        let e = tournament.events[i];
        tournament_info["events"].push({ "name": e.name, "entrants": [] });
        for (p of e.entrants.nodes) {
            message = [];
            for (const x of p.participants) {
                message.push(x.id); 
            }
            tournament_info["events"][i]["entrants"].push(message);
        }
    }
    tournament_info["participants"] = tournament_info["participants"].sort(function(a, b) {
        var nameA = a["tag"].toUpperCase();
        var nameB = b["tag"].toUpperCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
    });
    for (i = 0; i < tournament_info.events.length; i++) {
        let e = tournament_info.events[i];
        let tags = [];
        for (j = 0; j < e["entrants"].length; j++) {
            for (k = 0; k < tournament_info["participants"].length; k++) {
                if (e["entrants"][j] == tournament_info["participants"][k]["id"]) {
                    tags.push(tournament_info["participants"][k]);
                }
            }
        }
        tags = tags.sort(function(a, b) {
            var nameA = a["tag"].toUpperCase();
            var nameB = b["tag"].toUpperCase();
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
            return 0;
        });
        for (t of tags) {
            t = t["id"];
        }
        e["entrants"] = tags;
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
    console.log("Stream Tool:         http://" + ip.address() + ":" + PORT + "/tool/");
    console.log("Alternate Stream Tool: http://" + ip.address() + ":" + PORT + "/tool/alt/\n");
    console.log("Game Overlay:        " + process.cwd() + "\\assets\\overlays\\game\\index.html");
    console.log("Transition:          " + process.cwd() + "\\assets\\overlays\\transition\\index.html");
});
