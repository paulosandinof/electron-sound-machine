const nconf = require('nconf');

nconf.file({
  file: `${
    process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']
  }/sound-machine-config.json`,
});

function saveSettings(settingKey, settingValue) {
  nconf.set(settingKey, settingValue);
  nconf.save();
}

function readSettings(settingKey) {
  nconf.load();
  return nconf.get(settingKey);
}

module.exports = {
  saveSettings,
  readSettings,
};
