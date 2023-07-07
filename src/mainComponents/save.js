const { ipcMain } = require("electron");
const { save } = require('./fileSystem.js');


module.exports = function () {

	ipcMain.on('save-time', async (event, data) => {
		await save(data);
	});
}