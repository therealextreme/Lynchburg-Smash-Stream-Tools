
// Replaces the original window with one sized properly
function replace_window() {
    var (sx,sy,sw,sh) = view.screenBox(#workarea,#rectw);
    const w = self.toPixels(640dip); 
    const h = self.toPixels(480dip); 
    view.move(sx + (sw - w)/2, sy + (sh - h)/2, w, h);
}

// Open the tool's settings, updating two values for global usage of the program
function open_settings() {
    var settings_file = Stream.openFile(".\\settings.json", "r+");
    var jsonData = parseData(settings_file);
    update_swap = jsonData.update_swap;
    update_queue_up = jsonData.update_queue_up;
    settings_file.close()
}

// Onclick event for the Save Changes button
$(button#save).onClick = function() {
    var out_file = Stream.openFile(".\\settings.json", "w+");
    out_file.println(JSON.stringify($(form).value, null, "\t"));
    out_file.close();
    view.msgbox("LU Stream Tool", "Settings saved! Restart the program to apply changes."); // Show message box to restart program
}

// These variables are changed based on what settings the user chooses
var update_swap = false;
var update_queue_up = false;
open_settings();

// Updates the entries with the values from the settings
$(form).value = {
    update_swap: update_swap,
    update_queue_up: update_queue_up
}

////////////////////////////////////////////////////////////////////////////////////////////////////

// Program startup

////////////////////////////////////////////////////////////////////////////////////////////////////

// Opens the current JSON file with the current player and set information
var in_file = Stream.openFile(".\\overlays\\game_info.json", "r+");
parse_file(in_file);

// Replaces the window with a correctly sized one
replace_window();
