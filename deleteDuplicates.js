function deleteDuplicates(allFilms) {
	let allUniqueFilmsObj = {};

	allFilms.forEach(({ title, vod, rating }) => {
		if (!allUniqueFilmsObj[title]) {
			allUniqueFilmsObj[title] = { title, vod, rating };
		} else {
			const existingRating = parseFloat(
				allUniqueFilmsObj[title].rating.replace(',', '.')
			);
			const currentRating = parseFloat(rating.replace(',', '.'));

			allUniqueFilmsObj[title] =
				existingRating > currentRating
					? allUniqueFilmsObj[title]
					: { title, vod, rating };
		}
	});

	return Object.values(allUniqueFilmsObj);
}

module.exports = deleteDuplicates;
