const deleteDuplicates = require('./deleteDuplicates');
const combineUrls = require('./combineUrls');
const sortAndSave = require('./saveCSV');
const { Worker } = require('worker_threads');

const onMessage = (message, worker, allFilms) => {
	if (!!message?.exit) {
		console.log(`thread ${message?.index} ended`);

		worker.terminate();

		return [...allFilms, ...message?.films];
	}

	return [...allFilms];
};

const onExit = (activeWorkers, allFilms) => {
	activeWorkers -= 1;

	if (activeWorkers === 0) {
		const allUniqueFilms = deleteDuplicates(allFilms);

		console.log(allUniqueFilms.length);

		sortAndSave(allUniqueFilms);
	}

	return activeWorkers;
};

async function main() {
	allFilms = [];
	const vods = combineUrls();
	const workerFilePath = './getFilms.js';

	const workers = vods.map((vod) => {
		return new Worker(workerFilePath, { workerData: { vod } });
	});

	let activeWorkers = workers.length;

	workers.forEach((worker, index) => {
		worker.on(
			'message',
			(message) => (allFilms = onMessage(message, worker, allFilms))
		);
		worker.on('exit', () => (activeWorkers = onExit(activeWorkers, allFilms)));

		worker.postMessage({ type: 'start', index });
	});
}

main();
