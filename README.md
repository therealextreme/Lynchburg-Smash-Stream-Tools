
# Lynchburg Smash Stream Tools
A set of overlays for streaming, made for Lynchburg Smash. Includes overlays for widescreen (16:9) and a transition.

## Setup
### Prerequisites

    Node.js

Create a file in the root of the repository named `SMASHGG_TOKEN.txt` with your smash.gg API key, found under developer settings on smash.gg.

Open a command line to the root of the repository and enter these commands:

    npm install
    node server.js

After running once you can just use `node server.js` to run the overlay.

It will provide a list of urls, which are used for overlays and control. This window must be left running as long as you are using the overlays.

Go into OBS or Streamlabs and set up a new browser source. Check `Local file` and set the source to whatever location the executable gives you.

Set the width to 1920 (1280 if streaming in 720p) and the height to 1080 (720 if streaming in 720p).

Check `Shutdown Source When Not Visible` and `Refresh Broswer Source When Scene Becomes Active` before closing the properties.

If the overlay looks small or too big, right click the source -> Transform -> Edit Transform. Change the width and height value to match your stream dimensions.

~~To access the tool, go to the address on the executable or http://localhost:8000/tool/.~~ This version is unavailable, use the offline version instead.
To access the offline tool, go to the address on the executable or http://localhost:8000/tool/offline/.

## Various Locations (for 1080p)
### Game Overlay
Game Capture - Top left corner is at (16, 63), with a width of 1632 and a height of 918.

Player Cams - Two sources, both using the same physical camera. Both sources set to the same width of 512 and width of 288. Top player cam has a top left corner at (1392, 63) and the bottom player cam has a top left corner of (1648, 352).

### Transition
Game Capture - Top left corner is at (16, 501) with a width of 748 and a height of 420.

Player Cams - Top left corner is at (16, 63) with a width of 748 and a height of 420.

Commentary Cams - Top left corner is at (796, 63) with a width of 1108 and a height of 622.
