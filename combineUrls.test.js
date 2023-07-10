const combineUrls = require("./combineUrls");

const baseUrl = "https://www.filmweb.pl/ranking/vod/";

const vod = { name: "netflix", url: "" };

test("check if url isn't empty", () => {
  expect(combineUrls(vod)[0].url > 0);
});
