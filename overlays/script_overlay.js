
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
    document.getElementById("p_wrapper").style.top          = overlay_p1_name_y + "px";
    document.getElementById("p1_wrapper").style.left        = (overlay_p1_name_x + 100) + "px";
    document.getElementById("p2_wrapper").style.right       = (-1920 + overlay_p2_name_x + 100) + "px";

    document.getElementById("p1_s_wrapper").style.left      = overlay_p1_score_x + "px";
    document.getElementById("p1_s_wrapper").style.top       = overlay_p1_score_y + "px";
    document.getElementById("p2_s_wrapper").style.right     = overlay_p2_score_x + "px";
    document.getElementById("p2_s_wrapper").style.top       = overlay_p2_score_y + "px";

    document.getElementById("p1_s_num_wrapper").style.right = overlay_p1_score_num_x + "px";
    document.getElementById("p1_s_num_wrapper").style.top   = overlay_p1_score_num_y + "px";
    document.getElementById("p2_s_num_wrapper").style.left  = overlay_p2_score_num_x + "px";
    document.getElementById("p2_s_num_wrapper").style.top   = overlay_p2_score_num_y + "px";

    async function mainLoop() {
        const json_file = await getInfo();
        getData(json_file);
    }

    mainLoop();
    setInterval( () => {
        mainLoop();
        document.getElementById("bg_lines").style.backgroundPosition = bg_lines_x + "px " + overlay_bg_lines_y + "px";
        bg_lines_x += 1;
    }, 15);
}

async function getData(json_file) {
    // Get player and character information from the JSON
    // Player 1
    let p1_name =           json_file['p1_name'];
    let p1_score =          json_file['p1_score'];
    let p1_port =           json_file['p1_port'];
    let p1_bracket =        json_file['p1_bracket'];
    // Player 2
    let p2_name =           json_file['p2_name'];
    let p2_score =          json_file['p2_score'];
    let p2_port =           json_file['p2_port'];
    let p2_bracket =        json_file['p2_bracket'];
    // Set information
    let set =               json_file['set'];
    let round_num =         json_file['round_num'];
    let best_of =           json_file['best_of'];
    let tournament_name =   json_file['tournament_name'];
    let tournament_message = json_file['tournament_message'];
    let tournament_game =   json_file['game'];
    // Queued Set Information
    let queued_p1_name =    json_file['queued_p1_name'];    // Used for the transition, but not in the overlay
    let queued_p2_name =    json_file['queued_p2_name'];
    let queued_round =      json_file['queued_set'];

    game_count = "";
    if (best_of == 1) {
        game_count = "Best of 1";
    }
    if (best_of == 3) {
        game_count = "Best of 3";
    }
    if (best_of == 5) {
        game_count = "Best of 5";
    }

    if (startup) {
        if (p1_bracket == "Winners") {
            document.getElementById("p1_name").textContent = p1_name + " [W]";
        }
        else if (p1_bracket == "Losers") {
            document.getElementById("p1_name").textContent = p1_name + " [L]";
        }
        else {
            document.getElementById("p1_name").textContent = p1_name;
        }
        if (p2_bracket == "Winners") {
            document.getElementById("p2_name").textContent = p2_name + " [W]";
        }
        else if (p2_bracket == "Losers") {
            document.getElementById("p2_name").textContent = p2_name + " [L]";
        }
        else {
            document.getElementById("p2_name").textContent = p2_name;
        }

        document.getElementById("p1_score_image").setAttribute("src", "./img/score-" + p1_port + ".png");
        document.getElementById("p2_score_image").setAttribute("src", "./img/score-" + p2_port + ".png");
        document.getElementById("p1_score").textContent = p1_score;
        document.getElementById("p2_score").textContent = p2_score;

        if (set == "Round ") {
            document.getElementById("r_name").textContent = "Round " + round_num;
        }
        else {
            document.getElementById("r_name").textContent = set;
        }
        document.getElementById("best_of").textContent = game_count;

        document.getElementById("t_name").textContent = tournament_name;
        document.getElementById("g_name").textContent = tournament_game;

        gsap.fromTo("#p1_wrapper", {x: 20},  {delay: 1, x: 0, opacity: 1, ease: "power2.out", duration: 0.5});
        gsap.fromTo("#p2_wrapper", {x: -20}, {delay: 1, x: 0, opacity: 1, ease: "power2.out", duration: 0.5});

        gsap.to("#p1_s_wrapper", {delay: 1, opacity: 1, ease: "power2.out", duration: 0.5});
        gsap.to("#p2_s_wrapper", {delay: 1, opacity: 1, ease: "power2.out", duration: 0.5});
        gsap.fromTo("#p1_s_num_wrapper", {x: -10}, {delay: 1, x: 0, opacity: 1, ease: "power2.out", duration: 0.5});
        gsap.fromTo("#p2_s_num_wrapper", {x: 10},  {delay: 1, x: 0, opacity: 1, ease: "power2.out", duration: 0.5});

        gsap.fromTo("#r_wrapper",    {y: 10},  {delay: 1, x: 0, y: 0, opacity: 1, ease: "power2.out", duration: 0.5});
        gsap.fromTo("#best_wrapper", {y: 10},  {delay: 1, x: 0, y: 0, opacity: 1, ease: "power2.out", duration: 0.5});

        gsap.fromTo("#tn_wrapper",   {y: 5},  {delay: 1, x: 0, y: 0, opacity: 1, ease: "power2.out", duration: 0.5});
        gsap.fromTo("#g_wrapper",    {y: 5},  {delay: 1, x: 0, y: 0, opacity: 1, ease: "power2.out", duration: 0.5});
        
        startup = false;
    }
    else {
        if (p1_bracket == "0") {
            if (document.getElementById("p1_name").textContent != p1_name) {
                fade_out("#p1_wrapper", 20, 0, function() {
                    document.getElementById("p1_name").textContent = p1_name;
                    fade_in("#p1_wrapper", 20, 0);
                });
            }
        }
        else if (p1_bracket == "Winners") {
            if (document.getElementById("p1_name").textContent != p1_name + " [W]") {
                fade_out("#p1_wrapper", 20, 0, function() {
                    document.getElementById("p1_name").textContent = p1_name + " [W]";
                    fade_in("#p1_wrapper", 20, 0);
                });
            }
        }
        else if (p1_bracket == "Losers") {
            if (document.getElementById("p1_name").textContent != p1_name + " [L]") {
                fade_out("#p1_wrapper", 20, 0, function() {
                    document.getElementById("p1_name").textContent = p1_name + " [L]";
                    fade_in("#p1_wrapper", 20, 0);
                });
            }
        }
        if (p2_bracket == "0") {
            if (document.getElementById("p2_name").textContent != p2_name) {
                fade_out("#p2_wrapper", -20, 0, function() {
                    document.getElementById("p2_name").textContent = p2_name;
                    fade_in("#p2_wrapper", -20, 0);
                });
            }
        }
        else if (p2_bracket == "Winners") {
            if (document.getElementById("p2_name").textContent != p2_name + " [W]") {
                fade_out("#p2_wrapper", -20, 0, function() {
                    document.getElementById("p2_name").textContent = p2_name + " [W]";
                    fade_in("#p2_wrapper", -20, 0);
                });
            }
        }
        else if (p2_bracket == "Losers") {
            if (document.getElementById("p2_name").textContent != p2_name + " [L]") {
                fade_out("#p2_wrapper", -20, 0, function() {
                    document.getElementById("p2_name").textContent = p2_name + " [L]";
                    fade_in("#p2_wrapper", -20, 0);
                });
            }
        }
        if (document.getElementById("p1_score_image").getAttribute("src") != "./img/score-" + p1_port + ".png") {
            fade_out("#p1_s_wrapper", 0, 0, function() {
                document.getElementById("p1_score_image").setAttribute("src", "./img/score-" + p1_port + ".png");
                fade_in("#p1_s_wrapper", 0, 0);
            });
            fade_out("#p1_s_num_wrapper", -10, 0, function() {
                document.getElementById("p1_score").textContent = p1_score;
                fade_in("#p1_s_num_wrapper", -10, 0);
            });
        }
        if (document.getElementById("p2_score_image").getAttribute("src") != "./img/score-" + p2_port + ".png") {
            fade_out("#p2_s_wrapper", 0, 0, function() {
                document.getElementById("p2_score_image").setAttribute("src", "./img/score-" + p2_port + ".png");
                fade_in("#p2_s_wrapper", 0, 0);
            });
            fade_out("#p2_s_num_wrapper", 10, 0, function() {
                document.getElementById("p2_score").textContent = p2_score;
                fade_in("#p2_s_num_wrapper", 10, 0);
            });
        }
        if (document.getElementById("p1_score").textContent != p1_score) {
            fade_out("#p1_s_num_wrapper", -10, 0, function() {
                document.getElementById("p1_score").textContent = p1_score;
                fade_in("#p1_s_num_wrapper", -10, 0);
            });
        }
        if (document.getElementById("p2_score").textContent != p2_score) {
            fade_out("#p2_s_num_wrapper", 10, 0, function() {
                document.getElementById("p2_score").textContent = p2_score;
                fade_in("#p2_s_num_wrapper", 10, 0);
            });
        }
        if ((document.getElementById("r_name").textContent != set && document.getElementById("r_name").textContent != set + round_num) || document.getElementById("best_of").textContent != game_count) {
            fade_out("#r_wrapper", 0, 10, function() {
                if (set == "Round ") {
                    document.getElementById("r_name").textContent = set + round_num;
                }
                else {
                    document.getElementById("r_name").textContent = set;
                }
                fade_in("#r_wrapper", 0, 10);
            });
            fade_out("#best_wrapper", 0, 10, function() {
                document.getElementById("best_of").textContent = game_count;
                fade_in("#best_wrapper", 0, 10);
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
