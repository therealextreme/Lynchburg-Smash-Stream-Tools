
// Item Locations (Game Overlay)
// Player 1
const overlay_p1_name_x         = 160;
const overlay_p1_name_y         = 0;
const overlay_p1_score_x        = overlay_p1_name_x;
const overlay_p1_score_y        = overlay_p1_name_y;
const overlay_p1_score_num_x    = 20;
const overlay_p1_score_num_y    = 16;
// Player 2
const overlay_p2_name_x         = overlay_p1_name_x;
const overlay_p2_name_y         = overlay_p1_name_y;
const overlay_p2_score_x        = overlay_p2_name_x;
const overlay_p2_score_y        = overlay_p2_name_y;
const overlay_p2_score_num_x    = 20;
const overlay_p2_score_num_y    = 16;
// Background
const overlay_bg_lines_y        = 250;

// Item Locations (Versus)
// Player 1
const vs_p1_name_x              = 160;
const vs_p1_name_y              = 350;
// Player 2
const vs_p2_name_x              = 160;
const vs_p2_name_y              = vs_p1_name_y;
// Background
const vs_bg_lines_y             = 500;

// Item Locations (Global)
var bg_lines_x                  = 0;

let startup = true;

window.onload = init;

function init() {
    document.getElementById("p_wrapper").style.top          = vs_p1_name_y + "px";
    document.getElementById("p1_wrapper").style.left        = vs_p1_name_x + "px";
    document.getElementById("p2_wrapper").style.right       = (-1920 + vs_p2_name_x) + "px";

    async function mainLoop() {
        const json_file = await getInfo();
        getData(json_file);
    }

    mainLoop();
    setInterval( () => {
        mainLoop();
        document.getElementById("bg_lines").style.backgroundPosition = bg_lines_x + "px " + vs_bg_lines_y + "px";
        bg_lines_x += 1;
    }, 15);
}

async function getData(json_file) {
    // Set information
    let round =             json_file['set'];
    let best_of =           json_file['best_of'];
    let tournament_name =   json_file['tournament_name'];
    let tournament_message = json_file['tournament_message'];
    let tournament_game =   json_file['game'];
    // Queued Set Information
    let queued_p1_name =    json_file['queued_p1_name'];
    let queued_p2_name =    json_file['queued_p2_name'];
    let queued_round =      json_file['queued_set'];

    if (startup) {
        document.getElementById("tournament_message").textContent = tournament_message;

        document.getElementById("p1_wrapper").textContent = queued_p1_name;
        document.getElementById("p2_wrapper").textContent = queued_p1_name;

        document.getElementById("r_name").textContent = round;

        document.getElementById("t_name").textContent = tournament_name;
        document.getElementById("g_name").textContent = tournament_game;

        gsap.fromTo("#tournament_message", {y: 10}, {delay: 1, y: 0, opacity: 1, ease: "power2.out", duration: 0.5});

        gsap.to("#next_game", {delay: 1, opacity: 1, ease: "power2.out", duration: 0.5});
        gsap.fromTo("#vs_text", {y: 30}, {delay: 1, y: 0, opacity: 1, ease: "power2.out", duration: 0.5});

        gsap.fromTo("#p1_wrapper", {x: -20}, {delay: 1, x: 0, opacity: 1, ease: "power2.out", duration: 0.5});
        gsap.fromTo("#p2_wrapper", {x: 20},  {delay: 1, x: 0, opacity: 1, ease: "power2.out", duration: 0.5});

        gsap.fromTo("#r_wrapper",    {y: 20},  {delay: 1, x: 0, y: 0, opacity: 1, ease: "power2.out", duration: 0.5});

        gsap.fromTo("#tn_wrapper",   {y: 5},  {delay: 1, x: 0, y: 0, opacity: 1, ease: "power2.out", duration: 0.5});
        gsap.fromTo("#g_wrapper",    {y: 5},  {delay: 1, x: 0, y: 0, opacity: 1, ease: "power2.out", duration: 0.5});
        
        startup = false;
    }
    else {
        if (document.getElementById("tournament_message").textContent != tournament_message) {
            fade_out("#tournament_message", 0, -10, function() {
                document.getElementById("tournament_message").textContent = tournament_message;
                fade_in("#tournament_message", 0, -10);
            });
        }
        if (document.getElementById("p1_wrapper").textContent != queued_p1_name) {
            fade_out("#p1_wrapper", -20, 0, function() {
                document.getElementById("p1_wrapper").textContent = queued_p1_name;
                fade_in("#p1_wrapper", -20, 0);
            });
        }
        if (document.getElementById("p2_wrapper").textContent != queued_p2_name) {
            fade_out("#p2_wrapper", 20, 0, function() {
                document.getElementById("p2_wrapper").textContent = queued_p2_name;
                fade_in("#p2_wrapper", 20, 0);
            });
        }
        if (document.getElementById("r_name").textContent != queued_round) {
            fade_out("#r_wrapper", 0, 10, function() {
                document.getElementById("r_name").textContent = queued_round;
                fade_in("#r_wrapper", 0, 10);
            });
        }
        if (document.getElementById("t_name").textContent != tournament_name || document.getElementById("g_name").textContent != tournament_game) {
            fade_out("#tn_wrapper", 0, 5, function() {
                document.getElementById("t_name").textContent = tournament_name;
                fade_in("#tn_wrapper", 0, 5);
            });
            fade_out("#g_wrapper", 0, 5, function() {
                document.getElementById("g_name").textContent = tournament_game;
                fade_in("#g_wrapper", 0, 5);
            });
        }
    }
}

function fade_out(pwrapper, px_location, py_location, callback) {
    gsap.to(pwrapper, {x: px_location, y: py_location, opacity: 0, ease: "power2.out", duration: 0.5});
    setTimeout( function() { callback(); }, 360);
}

function fade_in(pwrapper, px_location, py_location) {
    gsap.to(pwrapper, {delay: 0.5, x: 0, y: 0, opacity: 1, ease: "power2.out", duration: 0.5});
}

function getInfo() {
    return new Promise(function (resolve) {
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", './game_info.json');
        oReq.send();

        function reqListener () {
            resolve(JSON.parse(oReq.responseText))
        }
    })
}
