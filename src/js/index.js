// Add your index.js code in this file
const electron = require('electron');
const path = require('path');

const { ipcRenderer, remote } = electron;
const { Tray, Menu } = remote;

function prepareButton(button, soundName) {
  const newButton = button;
  newButton.querySelector(
    'span'
  ).style.backgroundImage = `url("../img/icons/${soundName}.png")`;

  const audio = new Audio(
    path.resolve(__dirname, '..', 'wav', `${soundName}.wav`)
  );

  newButton.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });
}

// Trayicon

let trayIcon = null;

if (process.platform === 'darwin') {
  trayIcon = new Tray(
    path.resolve(__dirname, '..', 'img', 'tray-iconTemplate.png')
  );
} else {
  trayIcon = new Tray(
    path.resolve(__dirname, '..', 'img', 'tray-icon-alt.png')
  );
}

const trayMenuTemplate = [
  {
    label: 'Sound machine',
    enabled: false,
  },
  {
    label: 'Settings',
    click: () => {
      ipcRenderer.send('open-settings-window');
    },
  },
  {
    label: 'Quit',
    click: () => {
      ipcRenderer.send('close-main-window');
    },
  },
];

const trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);

// End of trayicon

// Soundbuttons

const soundButtons = document.querySelectorAll('.button-sound');

for (let i = 0; i < soundButtons.length; i += 1) {
  const soundButton = soundButtons[i];

  const soundName = soundButton.attributes['data-sound'].value;

  prepareButton(soundButton, soundName);
}

const closeButton = document.querySelector('.close');

closeButton.addEventListener('click', () => {
  ipcRenderer.send('close-main-window');
});

const settingsButton = document.querySelector('.settings');

settingsButton.addEventListener('click', () => {
  ipcRenderer.send('open-settings-window');
});

ipcRenderer.on('global-shortcut', (event, arg) => {
  const newEvent = new MouseEvent('click');

  soundButtons[arg].dispatchEvent(newEvent);
});

// End of Soundbuttons
