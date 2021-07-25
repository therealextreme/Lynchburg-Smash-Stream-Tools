
// imports
const express = require("express");     // server utilities
const ip =      require("ip");          // ip stuff

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

// setup server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get
app.get("/info", function(request, response) {
    response.send(tournament);
});
app.get("/tool", function(request, response) {
    response.sendFile("/assets/tool/tool.html", { root: process.cwd() });
});
app.get("/tool/offline", function(request, response) {
    response.sendFile("/assets/tool/offline_tool.html", { root: process.cwd() });
});

// post
app.post("/", function(request, response) {
    tournament = request.body;  // update tournament info with what is given from the tool
});

// start server
app.listen(PORT, () => {
    console.log("Listening at localhost:" + PORT + "...\n");
    //console.log("Stream Tool:         http://" + ip.address() + ":" + PORT + "/tool/");
    console.log("Offline Stream Tool: http://" + ip.address() + ":" + PORT + "/tool/offline/\n");
    console.log("Game Overlay:        " + process.cwd() + "\\assets\\overlays\\game\\index.html");
    console.log("Transition:          " + process.cwd() + "\\assets\\overlays\\transition\\index.html");
});
