const fs = require("fs");
const sortAndSave = require("./saveCSV");

const path = "./films.csv";
const films = [
  {
    title: "tele",
    vod: "vodNase",
    rating: "5",
  },
  {
    title: "tife",
    vod: "vodName",
    rating: "6",
  },
  {
    title: "tale",
    vod: "vodsame",
    rating: "8",
  },
  {
    title: "title",
    vod: "vodName",
    rating: "9",
  },
];

test("Check if file is created", () => {
  sortAndSave(films);
  expect(fs.existsSync(path)).toBe(true);
});
