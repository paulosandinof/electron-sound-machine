const electron = require('electron');

const {
  app, BrowserWindow, ipcMain, globalShortcut,
} = electron;

const configuration = require('./config');

let mainWindow = null;
let settingsWindow = null;

function setGlobalShortcuts() {
  globalShortcut.unregisterAll();

  const shortcutKeysSetting = configuration.readSettings('shortcutKeys');

  const shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : `${shortcutKeysSetting.join('+')}+`;

  globalShortcut.register(`${shortcutPrefix}1`, () => {
    mainWindow.webContents.send('global-shortcut', 0);
  });

  globalShortcut.register(`${shortcutPrefix}2`, () => {
    mainWindow.webContents.send('global-shortcut', 1);
  });
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    frame: false,
    height: 700,
    resizable: false,
    width: 368,
  });

  mainWindow.loadURL(`file://${__dirname}/views/index.html`);

  if (!configuration.readSettings('shortcutKeys')) {
    configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
  }

  setGlobalShortcuts();
});

ipcMain.on('close-main-window', () => {
  app.quit();
});

ipcMain.on('open-settings-window', () => {
  if (settingsWindow) {
    return;
  }

  settingsWindow = new BrowserWindow({
    frame: false,
    height: 200,
    resizable: false,
    width: 200,
  });

  settingsWindow.loadURL(`file://${__dirname}/views/settings.html`);

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
});

ipcMain.on('close-settings-window', () => {
  if (settingsWindow) {
    settingsWindow.close();
  }
});

ipcMain.on('set-global-shortcuts', () => {
  setGlobalShortcuts();
});
