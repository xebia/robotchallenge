# robotchallenge
Repository for the Xebia Test Automation robot challenge.

## Getting started

### Install required software

1. Download and install the software dependencies for your operation system:
       
    * [NodeJS-Windows](https://nodejs.org/dist/v4.4.4/node-v4.4.4-x86.msi)
    * [Git-Windows](https://git-scm.com/download/win)
    * [NodeJS-Mac](https://nodejs.org/dist/v4.4.4/node-v4.4.4.pkg)
    * [Git-Mac](https://git-scm.com/download/mac)    


2. Download and install your favorite text editor for this evening we recommend Atom or Visual Studio Code.
    * [Atom-Windows](https://github.com/atom/atom/releases/download/v1.7.3/AtomSetup.exe)
    * [Visual Studio Code-Windows](https://code.visualstudio.com/Docs/?dv=win)
    * [Atom-Mac](https://atom.io/download/mac)
    * [Visual Studio Code-Mac](https://code.visualstudio.com/Docs/?dv=osx)
    
### Download project and install project dependencies:

1. Clone repository from github, open a commandline or terminal and use the following command:
* git clone https://github.com/xebia/TestMasterBot.git

2. While still in your terminal go into the project and install the dependencies

```
cd TestMasterBot
npm install
```

## Connect the mBot

1. Turn on the mBot with the power switch
2. To connect to your robot, turn on the bluetooth on your laptop and look for new devices. 
3. Select Makeblock device.
4. When asked to pair with a code just accept the message
5. The robot is now connected to your laptop.
6. (Windows Only) To use the robot on windows we need the bluetooth com port to find this go to control panel ->
    Hardware and Sound -> Devices and printers -> Bluetooth Devices. Check the properties of the makeblock device and write down the com port.
    
    ![](https://ostc-planner.net/wp/wp-content/uploads/2016/03/Win7-pairing-4.png)
    
## Run the mBot

1. (Windows Only) Go into the project folder and open the package.json file change the COMX value to the COM port used by your machine example COM6
2. To run the mBot go into your project folder and open the terminal
3. Type npm run robot-mac for OS/X or npm run robot-windows
4. In command line you will see that the robot is connected and is waiting your input.


## Installing drivers

### Install using Arduino IDE

1. Install [Arduino IDE](http://arduino.cc)

```
git clone && cd TestMasterBot
npm install
```

2. Install fimata. Open arduino and navigate to `firmware/src/mbotFirmata/mbotFirmata.ino` and open it.

Compile and then upload to the board.

### Install using Interchange

Connect with USB cable and install firmware using interchange (instruction
below assumes `./node_modules/.bin` is on your path. You can also install interchange
with the `npm install -g nodebots-interchange` switch to install it globally.

```
npm install nodebots-interchange
```

You can install the firmware to work with either USB or Bluetooth with appropriate
firmata using the firmata switch on interchange

**To use USB:**

```
interchange install git+https://github.com/Makeblock-official/mbot_nodebots -a uno --firmata=usb
```

**To use Bluetooth:**

To use the BT module do the following modifications:

* Remove the bluetooth module from the mBot
* Install the bluetooth firmata with instruction below

```
interchange install git+https://github.com/Makeblock-official/mbot_nodebots -a uno --firmata=bluetooth
```

* Turn the mbot off, install the bluetooth module, turn the board on again.
* Pair the module (use whatever tool you need to make that work - usually BT settings
in your control panel).

Test the connection by using a screen terminal such as:

```
screen /dev/tty.Makeblock-ELETSPP
```

If this connects you should see the blue LED on the BT module go solid. From there
hit the reset button on the board and then you should see something like the following
appear on your terminal.

```
��ymbotFirmata.ino��{�3��l�A�2�U�
```

If you don't get that, test your connection etc. If you do then proceed.

Now execute

```
node examples/leds.js /dev/tty.Makeblock-ELETSPP
```

And you should get blinking lights over BT. You can do the same thing with
most of the examples though speed may be an issue in high data rate cases.


## Background & Troubleshooting

### Building the mBot
http://www.instructables.com/id/How-to-make-a-mBot-with-Makeblock/
