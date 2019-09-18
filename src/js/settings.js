// Add your settings.js code in this file
const electron = require('electron');

const { ipcRenderer } = electron;

const configuration = require('../config');

function bindModifierCheckboxes(event) {
  const shortcutKeys = configuration.readSettings('shortcutKeys');
  const modifierKey = event.target.attributes['data-modifier-key'].value;

  if (shortcutKeys.indexOf(modifierKey) !== -1) {
    const shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
    shortcutKeys.splice(shortcutKeyIndex, 1);
  } else {
    shortcutKeys.push(modifierKey);
  }

  configuration.saveSettings('shortcutKeys', shortcutKeys);

  ipcRenderer.send('set-global-shortcuts');
}

const modifierCheckboxes = document.querySelectorAll('.global-shortcut');

for (let i = 0; i < modifierCheckboxes.length; i += 1) {
  const shortcutKeys = configuration.readSettings('shortcutKeys');
  const modifierKey =
    modifierCheckboxes[i].attributes['data-modifier-key'].value;

  modifierCheckboxes[i].checked = shortcutKeys.indexOf(modifierKey) !== -1;

  modifierCheckboxes[i].addEventListener('click', event => {
    bindModifierCheckboxes(event);
  });
}

const closeButton = document.querySelector('.close');

closeButton.addEventListener('click', () => {
  ipcRenderer.send('close-settings-window');
});
