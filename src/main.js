const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const menu = require('./mainComponents/menu.js');
const path = require('path');
const pinButton = require('./mainComponents/pinButton.js'); 
const saveTimeWatcher = require('./mainComponents/save.js'); 
const endButton = require('./mainComponents/endButton.js');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 250,
		height: 150,
		minWidth: 200,
		minHeight: 135,
		fullscreen: false,
		webPreferences: {
			preload: path.join(__dirname, "mainComponents/preload.js")
		},
	});

	win.loadFile("./src/view/index.html");
	// open DEV
	// win.webContents.openDevTools();
};

Menu.setApplicationMenu(menu);

app.whenReady().then(() => {

	
	createWindow();
	
	saveTimeWatcher();

	pinButton();

	endButton();

	// console.log(app.getPath('userData'));
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});