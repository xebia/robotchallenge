module.exports = {
  RIGHT_MOTOR: { pins: { pwm: 5, dir: 4 } },
  LEFT_MOTOR: { pins: { pwm: 6, dir: 7 } },

  LEFT_LINE_SENSOR: 9,
  RIGHT_LINE_SENSOR: 10,

  BUTTON: { pin: "A7", mode: 0 },

  LIGHT_SENSOR: {pin: "A6", freq: 200, threshold: 25 },

  LEDS: {
    strips: [{pin: 13, length: 2}],
    controller: "FIRMATA"
  },

  PROXIMITY_SENSOR: {
    controller: "HCSR04",
    pin: "A3"
  }
};
