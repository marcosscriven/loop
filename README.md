# Loop Graphing

There's a really cool device from Navetas (based in Suffolk, UK), called [Loop Energy Saver](https://www.your-loop.com).

While their website provides a realtime reading, and historical values with a resolution of one hour, there's nothing to graph the realtime values.

As I was interested in learning how different devices in my house consumed electricity, I put this little script together.

The electricity readings are updated every 10 seconds, and the gas every 15 minutes.

Whether you try this in your browser, or in Node, you'll need your client serial number and secret. You can get this
by logging into your-loop.com, opening your browser's terminal (see [here](http://webmasters.stackexchange.com/questions/8525/how-to-open-the-javascript-console-in-different-browsers) if you need help), and typing in ```Drupal.settings.navetas_realtime```.

*You should keep your secret, well,* **secret!**

## Browser Client

![Screenshot](https://raw.githubusercontent.com/marcosscriven/marcosscriven.github.io/master/loop/screenshot.png)


* Go to http://marcosscriven.github.io/loop/
* Enter your serial/secret (stored client side only, but check the code!)
* Hit save
* *Optionally* click the cog icon, and check "Automatically save values to localStorage on exit.", only if you're using a browser only you have access to.

## Node Client

![Screenshot](https://raw.githubusercontent.com/marcosscriven/marcosscriven.github.io/master/loop/console.png)

* npm install
* Edit node-loop.js with your serial/secret
* npm start
* The 'inst' property in the output is the reading in watts
