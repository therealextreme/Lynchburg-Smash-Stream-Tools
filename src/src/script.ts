
// Replaces the original window with one sized properly
function replace_window() {
    var (sx,sy,sw,sh) = view.screenBox(#workarea,#rectw);
    const w = self.toPixels(1080dip); 
    const h = self.toPixels(800dip); 
    view.move(sx + (sw - w)/2, sy + (sh - h)/2, w, h);
}

// Parse the JSON file for the stream overlay
function parse_file(file) {
    var jsonData = parseData(file);
    const p1_name =             jsonData.p1_name;
    const p1_score =            jsonData.p1_score;
    const p1_port =             jsonData.p1_port;
    const p1_bracket =          jsonData.p1_bracket;
    const p2_name =             jsonData.p2_name;
    const p2_score =            jsonData.p2_score;
    const p2_port =             jsonData.p2_port;
    const p2_bracket =          jsonData.p2_bracket;
    const set =                 jsonData.set;
    const round_num =           jsonData.round_num;
    const game_count =          jsonData.best_of;
    const queued_p1_name =      jsonData.queued_p1_name;
    const queued_p2_name =      jsonData.queued_p2_name;
    const queued_set =          jsonData.queued_set;
    const queued_round_num =    jsonData.queued_round_num;
    const game =                jsonData.game;
    const tournament_name =     jsonData.tournament_name;
    const tournament_message =  jsonData.tournament_message;

    // Update the form with the latest information
    update_form(p1_name, p1_score, p1_port, p1_bracket, p2_name, p2_score, p2_port, p2_bracket, set, round_num, game_count, queued_p1_name, queued_p2_name, queued_set, queued_round_num, game, tournament_name, tournament_message);
}

// Updates the tool's input entries with what is passed to it
function update_form(p1_name, p1_score, p1_port, p1_bracket, p2_name, p2_score, p2_port, p2_bracket, set, round_num, game_count, queued_p1_name, queued_p2_name, queued_set, queued_round_num, game, tournament_name, tournament_message) {
    $(form).value = {
        p1_name: p1_name,
        p1_score: p1_score,
        p1_port: p1_port,
        p1_bracket: p1_bracket,
        p2_name: p2_name,
        p2_score: p2_score,
        p2_port: p2_port,
        p2_bracket: p2_bracket,
        set: set,
        round_num: round_num,
        game_count: game_count,
        queued_p1_name: queued_p1_name,
        queued_p2_name: queued_p2_name,
        queued_set: queued_set,
        queued_round_num: queued_round_num,
        game: game,
        tournament_name: tournament_name,
        tournament_message: tournament_message
    };
}

// Updates the stream by outputing the values of the form to the JSON file that the overlay uses
function update_stream() {
    var out_file = Stream.openFile(".\\overlays\\game_info.json", "w+");
    out_file.println(JSON.stringify($(form).value, null, "\t"));
    out_file.close();
}

// Open the tool's settings, updating two values for global usage of the program
function open_settings() {
    var settings_file = Stream.openFile(".\\settings.json", "r+");
    var jsonData = parseData(settings_file);
    update_swap = jsonData.update_swap;
    update_queue_up = jsonData.update_queue_up;
    settings_file.close()
}

// Onclick event for the Swap Players button
$(button#swap).onClick = function() {
    const p1_name  =            $(form).value.p2_name;
    const p1_score =            $(form).value.p2_score;
    const p1_port  =            $(form).value.p2_port;
    const p1_bracket =          $(form).value.p2_bracket;
    const p2_name  =            $(form).value.p1_name;
    const p2_score =            $(form).value.p1_score;
    const p2_port  =            $(form).value.p1_port;
    const p2_bracket =          $(form).value.p1_bracket;
    const set =                 $(form).value.set;
    const round_num =           $(form).value.round_num;
    const game_count =          $(form).value.best_of;
    const queued_p1_name =      $(form).value.queued_p1_name;
    const queued_p2_name =      $(form).value.queued_p2_name;
    const queued_set =          $(form).value.queued_set;
    const queued_round_num =    $(form).value.queued_round_num;
    const game =                $(form).value.game;
    const tournament_name =     $(form).value.tournament_name;
    const tournament_message =  $(form).value.tournament_message;

    // Update the form like normal
    update_form(p1_name, p1_score, p1_port, p1_bracket, p2_name, p2_score, p2_port, p2_bracket, set, round_num, game_count, queued_p1_name, queued_p2_name, queued_set, queued_round_num, game, tournament_name, tournament_message);
    
    // If the option to auto-update the stream after swapping players is enabled, update stream
    if (update_swap) { update_stream(); }
}

// Onclick even for the Move Queued Players button
$(button#queue_up).onClick = function() {
    const p1_name  =            $(form).value.queued_p1_name;
    const p1_score =            $(form).value.p1_score;
    const p1_port  =            $(form).value.p1_port;
    const p1_bracket =          $(form).value.p1_bracket;
    const p2_name  =            $(form).value.queued_p2_name;
    const p2_score =            $(form).value.p2_score;
    const p2_port  =            $(form).value.p2_port;
    const p2_bracket =          $(form).value.p2_bracket;
    const set =                 $(form).value.queued_set;
    const round_num =           $(form).value.queued_round_num;
    const game_count =          $(form).value.best_of;
    const queued_p1_name =      $(form).value.queued_p1_name;
    const queued_p2_name =      $(form).value.queued_p2_name;
    const queued_set =          $(form).value.queued_set;
    const queued_round_num =    $(form).value.queued_round_num;
    const game =                $(form).value.game;
    const tournament_name =     $(form).value.tournament_name;
    const tournament_message =  $(form).value.tournament_message;

    update_form(p1_name, p1_score, p1_port, p1_bracket, p2_name, p2_score, p2_port, p2_bracket, set, round_num, game_count, queued_p1_name, queued_p2_name, queued_set, queued_round_num, game, tournament_name, tournament_message);
    if (update_queue_up) { update_stream(); }
}

// Onclick event for the Update button
$(button#update).onClick = function() {
    update_stream();
}

// Onclick event for the Settings button
$(button#settings).onClick = function() {
    view.dialog(self.url("settings.htm"), true, -5);    // Opens a modal with settings.htm in it
}

// These variables are changed based on what settings the user chooses
var update_swap = false;
var update_queue_up = false;
open_settings();

////////////////////////////////////////////////////////////////////////////////////////////////////

// Program startup

////////////////////////////////////////////////////////////////////////////////////////////////////

// Opens the current JSON file with the current player and set information
var in_file = Stream.openFile(".\\overlays\\game_info.json", "r+");
parse_file(in_file);

// Replaces the window with a correctly sized one
replace_window();
