const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pinTimer', {
	pin: () => ipcRenderer.invoke('pin'),
	unpin: () => ipcRenderer.invoke('unpin')
});

contextBridge.exposeInMainWorld('end', {
	log: () => ipcRenderer.invoke('end')
});

contextBridge.exposeInMainWorld('timeLine', {
	save: (data) => ipcRenderer.send('save-time', data) //data-time
});

contextBridge.exposeInMainWorld('show', {
	logs: (cb) => ipcRenderer.on('logs', cb)
});

