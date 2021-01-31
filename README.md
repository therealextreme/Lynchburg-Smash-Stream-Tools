
# Lynchburg Smash Stream Tools
A set of overlays for streaming, made for Lynchburg Smash. Includes overlays for widescreen (16:9) and fullscreen (4:3) aspect ratio games, and a transition.

### Usage
To use the overlays, add a new browser source to an OBS scene. Set it to a local file, and point it to whichever overlay you want (./overlays/OVERLAY-16-9.html or ./overlays/OVERLAY-4-3.html). Make sure the width and height are set to 1920 x 1080, then scroll down to the bottom of the properties and click the checkbox next to "Refresh Browser Source When Scene Becomes Active". Save the changes and it should appear in the viewer.

The game capture or whatever you are streaming needs to be set at the proper size.
    For widescreen, resize the game capture to be 1600 x 900, and position the top left corner at (160, 90).
    For fullscreen, resize the game capture to be 1200 x 900, and position the top left corner at (360, 90).
