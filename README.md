
# Lynchburg Smash Stream Tools
A set of overlays for streaming, made for Lynchburg Smash. Includes overlays for widescreen (16:9) and a transition.

## Setup
### Prerequisites

    Node.js

Create a file in the root of the repository named `SMASHGG_TOKEN.txt` with your smash.gg API key, found under developer settings on smash.gg.

Go to the file where all steam overlay is stored and right click the file bar and select "copy address"

Open a command line to the root of the repository

This is done by first opening the command console (can be done by doing `windows key` + `r` and then typing `cmd` and pressing enter

Then type in 

    cm [paste your file address here for the root of the repository]" 
    
and the press `enter`

For the first install, enter these commands:

    npm install
    node server.js

After running once you can just use `node server.js` to run the overlay.

It will provide a list of urls that can be copy pasted into a browser. These are used for overlays and control. This window must be left running as long as you are using the overlays.

Go into OBS or Streamlabs and set up a new browser source. Check `Local file` and set the source to whatever location the executable gives you. 

This can be done by taking the file address written out in the command console and pasting it into center bottom search bar in the `Local File` file browser and pressing enter.

Back in OBS, set the width to 1920 (1280 if streaming in 720p) and the height to 1080 (720 if streaming in 720p).

Check `Shutdown Source When Not Visible` and `Refresh Broswer Source When Scene Becomes Active` before closing the properties.

If the overlay looks small or too big, right click the source -> Transform -> Edit Transform. Change the width and height value to match your stream dimensions.

To access the tool, go to the address on the executable or http://localhost:8000/tool/.

This version uses smash.gg integration, so if your tournament doesn't use smash.gg, you can use the alternate version of the tool.

To access the alternate tool, go to the address on the executable or http://localhost:8000/tool/alt/.

## Various Locations (for 1080p)
### Game Overlay
Game Capture - Top left corner is at (16, 63), with a width of 1632 and a height of 918.

Player Cams - Two sources, both using the same physical camera. Both sources set to the same width of 512 and width of 288. Top player cam has a top left corner at (1392, 63) and the bottom player cam has a top left corner of (1648, 352).

### Transition
Game Capture - Top left corner is at (16, 501) with a width of 748 and a height of 420.

Player Cams - Top left corner is at (16, 63) with a width of 748 and a height of 420.

Commentary Cams - Top left corner is at (796, 63) with a width of 1108 and a height of 622.
