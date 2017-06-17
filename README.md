# Robot Challenge 
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3e9f8371f5a64e6fa5e4b24df7fd6cd5)](https://www.codacy.com/app/XTA/robotchallenge?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=xebia/robotchallenge&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/3e9f8371f5a64e6fa5e4b24df7fd6cd5)](https://www.codacy.com/app/XTA/robotchallenge?utm_source=github.com&utm_medium=referral&utm_content=xebia/robotchallenge&utm_campaign=Badge_Coverage)

### Getting started

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
* git clone https://github.com/xebia/robotchallenge.git

2. While still in your terminal go into the project and install the dependencies

```
cd robotchallenge
npm install
```


### Connect the mBot

1. Turn on the mBot with the power switch
2. To connect to your robot, turn on the bluetooth on your laptop and look for new devices. 
3. Select Makeblock device.
4. When asked to pair with a code just accept the message
5. The robot is now connected to your laptop.
6. (Windows Only) To use the robot on windows we need the bluetooth com port to find this go to control panel ->
    Hardware and Sound -> Devices and printers -> Bluetooth Devices. Check the properties of the makeblock device and write down the com port.
    
    ![](https://ostc-planner.net/wp/wp-content/uploads/2016/03/Win7-pairing-4.png)
    
### Run the mBot

1. (Windows Only) Go into the project folder and open the package.json file change the COMX value to the COM port used by your machine example COM6
2. To run the mBot go into your project folder and open the terminal
3. Type npm run robot-mac for OS/X or npm run robot-windows
4. In command line you will see that the robot is connected and is waiting your input.
