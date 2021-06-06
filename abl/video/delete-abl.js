"use strict";

const path = require("path");
const LibraryDao = require("../../dao/video-library-dao");
let dao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);

// delete video - accepts only video.code parameter
async function DeleteAbl(req, res) {
  let { code } = req;
  let videoCheck;
  if (code && (typeof code === "string" || code.length < 30)) {
    try {
      videoCheck = await dao.getVideo(code);
    } catch (e) {
      if (e.code === "FAILED_TO_LOAD_VIDEO") {
        return res.status(400).json({ error: e });
      } else {
        return res.status(500).json({ error: e });
      }
    }

    if (!videoCheck) {
      return res.status(400).json({
        error_message: `Video with code ${code} does NOT exist!`,
      });
    }

    try {
      await dao.deleteVideo(code);
      res.status(200).json({});
    } catch (e) {
      if (e.code === "DELETE_FAILED") {
        res.status(400).json({ error_message: e });
      } else {
        res.status(500).json({ error_message: e });
      }
    }
  } else {
    res.status(400).json({
      error_message: "Invalid input data.",
    });
  }
}

module.exports = DeleteAbl;
