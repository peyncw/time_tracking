const { BrowserWindow, ipcMain } = require("electron");


module.exports = () => {
	let win = BrowserWindow.getAllWindows()[0];

	ipcMain.handle('end', () => {
		let [width, height] = win.getSize();
		if(height < 170) win.setSize(width, 170, true);
	});
}