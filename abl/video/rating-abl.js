"use strict";

const path = require("path");
const LibraryDao = require("../../dao/video-library-dao");
let dao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);

// load validation schema
const Ajv = require("ajv").default;
const { ratingVideoSchema } = require("../../schemas/video-schemas");

// Rating video - accepts all parameters
async function RatingAbl(req, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(ratingVideoSchema, req);

  if (!valid) {
    return res.status(400).json({ error: ajv.errors });
  }
  let { code, rating } = req;

  if (code) {
    let video = await dao.getVideo(code);

    if (!video)  {
      return res
        .status(400)
        .json({ error_message: `Video with code '${code}' doesn't exist.` });
    }
    
    let newRating = (
      (Number(video.ratingTotal) + rating) /
      (Number(video.ratingCount) + 1)
    ).toFixed(1);

    video.ratingTotal += rating;
    video.ratingCount += 1;
    video.averageRating = Number(newRating);

    try {
      let result = await dao.updateVideo(video);
      res.status(200).json(result);
    } catch (e) {
      if (e.code === "FAILED_TO_GET_VIDEO") {
        res.status(400).json({ error_message: "Failed to load video." });
      } else if (e.code === "FAILED_TO_UPDATE_VIDEO") {
        res.status(400).json({ error_message: "Failed to update video" });
      } else {
      res.status(%00).json({ error_message: e }
      }
    }
  } else {
    res.status(400).json({
      error_message: "Invalid input data.",
    });
  }
}

module.exports = RatingAbl;
