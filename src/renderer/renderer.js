import timer from './timer.js';
import timeFormat from './counterFormat.js';


let dateStart;
let isRunning = false;
let isPause = false;

function saveLog() {
	isPause = false;
	let element = document.getElementById('logs');
	let date = (new Date(dateStart)).toDateString();
	let time = timer.getTime();
	element.innerText = `${date} - ${timeFormat(time["hours"])}:${timeFormat(time["minutes"])}:${timeFormat(time["seconds"])}`;
	window.timeLine.save({ date: date, time: `${timeFormat(time["hours"])}:${timeFormat(time["minutes"])}:${timeFormat(time["seconds"])}` });
	document.title = 'Time Tracking';
}

async function logsView() {
	let element = document.getElementById('logs');
	await window.show.logs((_event, data) => {
		element.innerText = '';
		data = JSON.parse(data);
		// console.log(data, data[0]);
		data.forEach(el => {
			let log = document.createElement('p');
			log.innerText = `${el["date"]} - ${el["time"]}`;
			element.append(log);
		});
	});
}

logsView();

function start() {
	isRunning = !isRunning;
	if (isPause) isPause = !isPause;
	if (isRunning) document.getElementById('logs').innerText = '';
	if (!dateStart) dateStart = Date.now();

	startInterval();

	timer.start();
	document.getElementById('start-pause').className = 'btn pause';
	document.getElementById('loader').setAttribute('style', 'visibility: visible;');
	document.getElementById('loader').className = 'loader';
}

function pause() {
	isPause = !isPause;
	clearInterval(intervalId);
	isRunning = false;
	timer.pause();
	document.getElementById('start-pause').className = 'btn play';
	// document.getElementById('loader').setAttribute('style', 'visibility: hidden;');
	document.getElementById('loader').className = 'loader-pause';
}

const timeField = document.getElementById("time");
let intervalId;




// let expectedDate = 0;
let interval = 1000;

function startInterval() {
	document.title = 'Total worked:';
	intervalId = setInterval(function () {
		// console.log(Date.now() - expectedDate, 'TEST!!!');
		// interval = Date.now() - expectedDate;
		// expectedDate = Date.now() + interval;

		let time = timer.getTime();
		let hours = timeFormat(time.hours);
		let minutes = timeFormat(time.minutes);
		let seconds = timeFormat(time.seconds);

		timeField.innerText = `${hours}:${minutes}:${seconds}`;
	}, interval);
}

document.getElementById('start-pause').addEventListener('click', () => {
	if (isRunning) pause();
	else start();
});

document.getElementById('save').addEventListener('click', async () => {
	if (isRunning || isPause) {
		await window.end.log();
		pause();
		saveLog();
		document.getElementById('loader').setAttribute('style', 'visibility: hidden;');
		timer.stop();
		timeField.innerText = '00:00:00';
		dateStart = null;
	}
});

document.getElementById('pin-on').addEventListener('click', async () => {
	await window.pinTimer.pin();
	document.getElementById('pin-on').hidden = true;
	document.getElementById('pin-off').hidden = false;
});

document.getElementById('pin-off').addEventListener('click', async () => {
	await window.pinTimer.unpin();
	document.getElementById('pin-on').hidden = false;
	document.getElementById('pin-off').hidden = true;
});

