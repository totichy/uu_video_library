"use strict";

const path = require("path");

const LibraryDao = require("../../dao/video-library-dao");
let dao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);

// video list - accepts only video.name parameter
async function ListAbl(req, query, res) {
  let { title } = req;

  let titleFinal;

  if (query.title) {
    titleFinal = query.title;
  } else {
    titleFinal = title;
  }
  // input data verification
  if (
    !titleFinal ||
    (titleFinal && typeof titleFinal === "string" && titleFinal.length < 100)
  ) {
    try {
      let videoList = await dao.listVideos(titleFinal);
      if (titleFinal && videoList.length === 0) {
        res.status(400).json({
          error_message: `Video with title ${titleFinal} does not exist.`,
        });
      } else {
        res.status(200).json(videoList);
      }
    } catch (e) {
      res.status(500).json({ error_message: e });
    }
  } else {
    res.status(400).json({
      error_message: "Invalid input data.",
    });
  }
}

module.exports = ListAbl;
