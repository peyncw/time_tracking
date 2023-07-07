const { BrowserWindow, ipcMain } = require("electron");


module.exports = function() {
	let win = BrowserWindow.getAllWindows()[0];
	ipcMain.handle('pin', () => {
		win.setAlwaysOnTop(true);
		win.setSize(200, 135, true);
	});
	ipcMain.handle('unpin', () => {
		win.setAlwaysOnTop(false);
		win.setSize(250, 150, true);
	});
}