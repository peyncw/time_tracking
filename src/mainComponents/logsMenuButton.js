const { BrowserWindow } = require("electron");
const { clearData, readStorageData } = require('./fileSystem.js');

async function showLogs() {
	let win = BrowserWindow.getAllWindows()[0];
	let [width, height] = win.getSize();
	let data = await readStorageData();
	let newHight = (JSON.parse(data).length * 18) + 135;
	width = width < 300 ? 300 : width;
	height = height < newHight ? newHight : height;
	win.setSize(width, height, true);
	win.webContents.send('logs', data);
}

async function clearLogs() {
	await clearData();
	let win = BrowserWindow.getAllWindows()[0];
	win.webContents.send('logs', JSON.stringify([]));
}

module.exports = { showLogs, clearLogs };