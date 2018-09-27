// Add your index.js code in this file
const ipcRenderer = require('electron').ipcRenderer;
const remote = require('electron').remote;
const path = require('path');

const Tray = remote.Tray;
const Menu = remote.Menu;

//Trayicon

let trayIcon = null;

if(process.platform === 'darwin'){

    trayIcon = new Tray(path.join(__dirname, 'img/tray-iconTemplate.png'));

}else{

    trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));

}

let trayMenuTemplate = [
    
    {
        label: 'Sound machine',
        enabled: false
    },

    {
        label: 'Settings',
        click: ()=>{

            ipcRenderer.send('open-settings-window');
        
        }
    },

    {
        label: 'Quit',
        click: ()=>{
        
            ipcRenderer.send('close-main-window');
        
        }
    }

]

let trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);

//End of trayicon

//Soundbuttons

let soundButtons = document.querySelectorAll('.button-sound');

for(let i = 0; i < soundButtons.length; i++){

    let soundButton = soundButtons[i];

    let soundName = soundButton.attributes['data-sound'].value;

    prepareButton(soundButton, soundName);

}

let closeButton = document.querySelector('.close');

closeButton.addEventListener('click', ()=>{

    ipcRenderer.send('close-main-window');

});

let settingsButton = document.querySelector('.settings');

settingsButton.addEventListener('click', ()=>{

    ipcRenderer.send('open-settings-window');

});

ipcRenderer.on('global-shortcut', (event, arg)=>{

    let newEvent = new MouseEvent('click');

    soundButtons[arg].dispatchEvent(newEvent);

});

//End of Soundbuttons

//functions
function prepareButton(button, soundName) {

    button.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

    let audio = new Audio(__dirname + '/wav/' + soundName + '.wav');

    button.addEventListener('click', ()=>{

        audio.currentTime = 0;
        audio.play();

    });
}