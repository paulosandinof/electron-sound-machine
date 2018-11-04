# Electron Sound Machine

A simple example of a sound machine made with Electron.

The example was made following the above guide, but using a newer version of electron and new stuff from ES6.

https://medium.com/developers-writing/building-a-desktop-application-with-electron-204203eeb658 

## Running the application

This project was built using **NodeJs 8.12.0** and **Electron 1.8.8**

- Clone the repository:
```bash
git clone https://github.com/paulosandinof/electron_sound_machine.git
```

- A directory with the name **electron_sound_machine** will be created, access it:
```bash
cd electron-sound-machine
```

- Inside this folder, install the project dependencies:
```bash
npm install
```

- Start the application:
```bash
npm start
```

## TODO

- Insert diferent sounds already avaliable in the project folder
- Insert diferent icons already avaliable in the project folder
- Correct the tray icon on linux

## Known issues

- With **Ubuntu 18.04** the following error may occur:
```bash
Gtk-Message: 22:29:00.615: Failed to load module "canberra-gtk-module"
```

- Correct this installing the canberra-gtk-module:
```bash
apt install libcanberra-gtk-module
```
