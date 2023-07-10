function combineUrls() {
	const baseUrl = 'https://www.filmweb.pl/ranking/vod/';
	const suffix = '/film';

	const vods = [
		{ name: 'netflix', url: '' },
		{ name: 'hbo_max', url: '' },
		{ name: 'canal_plus_manual', url: '' },
		{ name: 'disney', url: '' },
	];

	return vods.map(({ name }) => ({
		name,
		url: `${baseUrl}${name}${suffix}`,
	}));
}

module.exports = combineUrls;
