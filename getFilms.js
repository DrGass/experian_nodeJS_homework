const axios = require('axios');
const cheerio = require('cheerio');
const { parentPort, workerData } = require('worker_threads');

parentPort.on('message', (message) => {
	if (message?.type === 'start') {
		console.log(`thread ${message?.index} started`);
		const { vod } = workerData;

		getFilms(vod).then((films) => {
			parentPort.postMessage({ exit: true, index: message?.index, films });
		});
	}
});

async function getFilms({ url, name: vod }) {
	try {
		const { data } = await axios({
			method: 'GET',
			url,
		});

		const $ = cheerio.load(data);

		// As the selector from website didn't work i needed to create this workaround that works.
		const elemSelector =
			'#site > [data-group=rankingPage] > div.page__content.fa__wrapper > div > [data-group=g3] > section > div.page__container.rankingTypeSection__container > div';

		let films = [];
		$(elemSelector).each((parentIdx, parentElem) => {
			if (parentIdx <= 9) {
				let title = $(parentElem).find('div.rankingType__header > p').text();
				let rating = $(parentElem)
					.find(
						'div.rankingType__rateWrapper > div > span.rankingType__rate--value '
					)
					.text();
				
					// If the sub title is pure numeric, it means that i need to take main title as it means it wasn't translated
				if (!Object.is(Number(title), NaN)) {
					title = $(parentElem).find('div.rankingType__header > div').text();
					// Slice the year out of title
				} else {
					title = title.slice(0, -5);
				}

				films.push({
					title,
					vod,
					rating,
				});
			}
		});

		return films;
	} catch (err) {
		console.error(err);
	}
}
