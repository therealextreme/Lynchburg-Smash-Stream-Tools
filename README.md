
# Lynchburg Smash Stream Tools
A set of overlays for streaming, made for Lynchburg Smash. Includes overlays for widescreen (16:9) and a transition.

### Usage
Create a file in the root of the repository named `SMASHGG_TOKEN.txt` with your smash.gg API key, found under developer settings on smash.gg.
Run `server.exe`. It will provide a list of urls, which are used for overlays and control. This executable must be left running as long as you are using the overlays.
Go into OBS or Streamlabs and set up a new browser source. The url should be set to whatever address the executable gives you or http://localhost:8000/?overlay=game. Make sure to check "Refresh Broswer Source When Scene Becomes Active" as well.
Additional overlays are lsited as urls on the executable.

To access the tool, go to the address on the executable or http://localhost:8000.
