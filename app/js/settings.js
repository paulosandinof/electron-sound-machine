// Add your settings.js code in this file
const ipcRenderer = require('electron').ipcRenderer;
const configuration = require('./configuration');

let modifierCheckboxes = document.querySelectorAll('.global-shortcut');

for(let i = 0; i < modifierCheckboxes.length; i++){

    let shortcutKeys = configuration.readSettings('shortcutKeys');
    let modifierKey = modifierCheckboxes[i].attributes['data-modifier-key'].value;

    modifierCheckboxes[i].checked = (shortcutKeys.indexOf(modifierKey) !== -1);

    modifierCheckboxes[i].addEventListener('click', (event)=>{
        
        bindModifierCheckboxes(event);
    
    });

}

let closeButton = document.querySelector('.close');

closeButton.addEventListener('click', ()=>{

    ipcRenderer.send('close-settings-window');

});

function bindModifierCheckboxes(event) {
    
    let shortcutKeys = configuration.readSettings('shortcutKeys');
    let modifierKey = event.target.attributes['data-modifier-key'].value;

    if(shortcutKeys.indexOf(modifierKey) !== -1){

        let shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
        shortcutKeys.splice(shortcutKeyIndex, 1);

    }else{

        shortcutKeys.push(modifierKey);

    }

    configuration.saveSettings('shortcutKeys', shortcutKeys);

    ipcRenderer.send('set-global-shortcuts');

}