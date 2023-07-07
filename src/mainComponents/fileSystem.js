const fs = require('fs/promises');
const { app } = require('electron');
const path = require('path');
const dataPath = path.join(app.getPath('userData'), '/data.json');
async function save (line) {

	try {
		let data;
		await (async() => {
			data = await fs.readFile(dataPath, { encoding: 'utf8' });
		})().catch((err) => {
			console.log(err);
			if(err.code == 'ENOENT') data = JSON.stringify([]);
		});
		data = JSON.parse(data);
		if (data) {
			if (data.length >= 30) data.shift();
			data.push(line);
			await fs.writeFile(dataPath, JSON.stringify(data));
		}
	} catch (err) {
		console.log('!!!!', err);
	}
}

async function clearData() {
	await (async () => {
		await fs.writeFile(dataPath, JSON.stringify([]));
	})().catch(console.error);
}

async function readStorageData() {
	let data;
	await (async () => {
		data = await fs.readFile(dataPath, { encoding: 'utf8' });
	})().catch(async (err) => {
		console.log(err);
		if (err.code == 'ENOENT') await (async () => {
			data = JSON.stringify([]);
			await fs.writeFile(dataPath, data);
		})().catch(console.error);
	});
	return data;
}

module.exports = { save, clearData, readStorageData }

// save({date: 'Mon 19 06 2023', time: '0:0:12'});