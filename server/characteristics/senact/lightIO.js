const rpio = require('rpio')

const sensors = require('./senactGlobals').sensors
const actuators = require('./senactGlobals').actuators

const lightIO = {
  isOn: false,
  isAutomatic: false,
  
  init: () => {
    rpio.open(sensors.LIGHT, rpio.INPUT)
    rpio.open(actuators.LED, rpio.OUTPUT)
  },
  
  set: (value) => {
    console.log('Lights Toggled: ' + (value ? 'on' : 'off'))
    this.isOn = value
    rpio.write(actuators.LED, +value)
  },
  
  setModeAutomatic: (mode) => {
    console.log('Lights Automatic Mode: ' + (mode ? 'on' : 'off'))
    if (mode) {
      rpio.poll(sensors.LIGHT, (pin) => {
        lightIO.set(rpio.read(pin)) // TOGGLE LIGHTS IF READ 1
      })
    } else if (this.isAutomatic) { // TODO: fix it gracefully
      rpio.poll(sensors.LIGHT, null)
    }
    this.isAutomatic = mode
  }
}

lightIO.init()
module.exports = lightIO