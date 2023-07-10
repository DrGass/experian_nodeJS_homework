const j2cp = require("json2csv").Parser;
fs = require("fs");

async function sortAndSave(allFilms) {
  // Sorting array
  allFilms = allFilms.sort(
    (a, b) =>
      parseFloat(b.rating.replace(",", ".")) -
      parseFloat(a.rating.replace(",", "."))
  );

  // saving to csv
  const parser = new j2cp();
  const csv = parser.parse(allFilms);
  fs.writeFileSync("./films.csv", csv);
}

module.exports = sortAndSave;
