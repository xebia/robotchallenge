/* dependencies */
var mbot = require("../mbotlayout");
var five = require("johnny-five");
var pixel = require("node-pixel");

/* private variables */
var celebrating, leds, lightStatus;

/* exported objects */
module.exports = {
  initialize: function(Board) {
    lightStatus = false;

    var mbotStrip = mbot.LEDS;
    mbotStrip.board = Board;
    leds = new pixel.Strip(mbotStrip);
  },
  turnOnLights: function() {
    leds.color("#ffffff");
    leds.show();
    lightOnTimer = setTimeout(function() {
      lightStatus = true;
    },200);
  },
  turnOffLights: function() {
    lightStatus = false;
    if (celebrating) {
      clearInterval(celebrating);
    }
    lightOnTimer = setTimeout(function() {
      leds.color("#000");
      leds.show();
    },200);
  },
  celebrate: function() {
    var fps = 10;

    console.log("FINISH!");

    var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
    var current_colors = [0,1,2,3,4];
    var current_pos = [0,1,2,3,4];
    celebrating = setInterval(function() {

      leds.color("#000"); // blanks it out

      for (var i=0; i< current_pos.length; i++) {
        if (++current_pos[i] >= leds.stripLength()) {
          current_pos[i] = 0;
          if (++current_colors[i] >= colors.length) current_colors[i] = 0;
        }
        leds.pixel(current_pos[i]).color(colors[current_colors[i]]);
      }

      leds.show();
    }, 1000/fps);
  },
  lightStatus: function() {
    return lightStatus;
  }
}
