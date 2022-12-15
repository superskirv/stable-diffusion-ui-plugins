# stable-diffusion-ui-plugins
UI Plugins for the Stable Diffusion UI

Install into your `C:\stable-diffusion-ui\plugins\ui` folder.

### DateFolderNames.plugin.js
  This will not work with multiple tabs simultaneously. This plugin is designed for single user, single tab. I use it to help keep my images in easily structured folders. It could be modified to include hour:minute:second:millisecond if needed.

### Ski-SDUI-MoreRes.plugin.js
  ***This has been superseded by Ski-ScaleResolutions.plugin.js but still functions***
  This will over write resolution drop down box with every combination of multiples of 64, upto 2304.

### Ski-ScaleResolutions.plugin.js
  This will add paired resolutions to the bottom of the list of resolutions. Example I want images that are similar ratio too 768x512, or 3:2, or 3 divided by 2, which is 1.5. So this will search for any resolutions below a set max(default 2048), that are exactly 1.5(960x640), or close enough(1984x1344), configured to be anything within .03, or 3 percent. Once it finds a pair it will add it to the bottom of the resolution list with the title "Pair 1", just match both width and height with its pair and your good.
  ![Example Config Screenshot](https://github.com/superskirv/stable-diffusion-ui-plugins/blob/main/examples/example1.png)
  ![Example Dropdown Screenshot](https://github.com/superskirv/stable-diffusion-ui-plugins/blob/main/examples/example2.png)

### resolution-ratios.xlsx
  This is a excel spreadsheet designed to help me with resolutions that are close to the one I want, but bigger.

For more info on SDUI, check [here](https://github.com/cmdr2/stable-diffusion-ui/wiki/UI-Plugins).
