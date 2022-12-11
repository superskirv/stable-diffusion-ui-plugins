# stable-diffusion-ui-plugins
UI Plugins for the Stable Diffusion UI

Install into your `C:\stable-diffusion-ui\plugins\ui` folder.

DateFolderNames.plugin.js
This will not work with multiple tabs simultaneously. This plugin is designed for single user, single tab. I use it to help keep my images in easily structured folders. It could be modified to include hour:minute:second:millisecond if needed. 

Ski-ScaleResolutions.plugin.js
This will add paired resolutions to the bottom of the list of resolutions. Example I want images that are 768x512, or 3:2, or 3 divided by 2, which is 1.5. So this will search for any resolutions below a set max, that are exactly 1.5, or close enough, configured to be anything within .03, or 3 percent. Once it finds a pair it will add it to the bottom of the resolution list with the title "Pair 1", just match both width and height with its pair and your good.

For more info, check [here](https://github.com/cmdr2/stable-diffusion-ui/wiki/UI-Plugins).


