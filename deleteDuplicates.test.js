const { all } = require("axios");
const deleteDuplicates = require("./deleteDuplicates");

allFilms = [
  (movie = {
    title: "title",
    vod: "vodName",
    // year : year,
    rating: "5",
  }),
  (movie = {
    title: "2222title",
    vod: "vodName",
    // year : year,
    rating: "2",
  }),
  (movie = {
    title: "ti4tle",
    vod: "vodName",
    // year : year,
    rating: "3",
  }),  (movie = {
    title: "title",
    vod: "vodName",
    // year : year,
    rating: "5",
  }),
  (movie = {
    title: "2222title",
    vod: "vodName",
    // year : year,
    rating: "2",
  }),
  (movie = {
    title: "title",
    vod: "vodName",
    // year : year,
    rating: "8",
  })
];

allFilms = deleteDuplicates(allFilms);


test("Check if duplicates got deleted", () => {
  expect(allFilms.length).toEqual(3);
});
