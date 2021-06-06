"use strict";

const path = require("path");
const LibraryDao = require("../../dao/video-library-dao");
let dao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);

// get video - accepts only video.code parameter
async function GetAbl(req, query, res) {
  const { code } = req;
  let codeFinal;
  if (query.code) {
    codeFinal = query.code;
  } else {
    codeFinal = code;
  }

  if (codeFinal && (typeof codeFinal !== "string" || codeFinal.length > 30)) {
    return res.status(400).json({
      error_message:
        "Invalid input: code parameter is missing or invalid data.",
    });
  }

  try {
    const video = await dao.getVideo(codeFinal);
 
    if (!video) {
      return res
        .status(400)
        .json({
          error_message: `Video with code '${codeFinal}' doesn't exist.`,
        });
    }

    res.json(video);
  } catch (e) {
    if (e.code === "FAILED_TO_LOAD_VIDEO") {
      return res.status(400).json({ error: e });
    } else {
      return res.status(500).json({ error: e });
    }
  }
}

module.exports = GetAbl;
