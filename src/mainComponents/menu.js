const { Menu, MenuItem, BrowserWindow, ipcMain } = require("electron");
const fs = require('fs/promises');

const { showLogs, clearLogs } = require('./logsMenuButton.js');

const menu = new Menu();
menu.append(new MenuItem({
	label: 'App',
	submenu: [
		{
			label: 'About Simple Time Tracking App',
			role: 'about'
		},
		{
			label: 'Hide Time Tracker',
			role: 'hide',
			accelerator: process.platform === 'darwin' ? 'Cmd+H' : 'Ctr+H'
		},
		{
			label: 'Show Time Tracker',
			role: 'unhide'
		},
		{
			label: 'Quit Simple Time Tracking App',
			role: 'quit',
			accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctr+Q'
		}
	]
}));

menu.append(new MenuItem({
	label: 'Logs',
	submenu: [
		{
			label: 'Show logs',
			click: async () => {
				await showLogs();
			}
		},
		{
			label: 'Clear logs',
			click: async () => {
				await clearLogs();
			}
		}
	]
}));

module.exports = menu;