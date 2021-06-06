"use strict";

const path = require("path");
const LibraryDao = require("../../dao/video-library-dao");
let dao = new LibraryDao(
  path.join(__dirname, "..", "..", "storage", "videos.json")
);
const CategoryDao = require("../../dao/category-dao");
let categoryDao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

// update video - accepts all parameters
async function UpdateAbl(req, res) {
  let {
    code,
    authorName,
    authorSurname,
    title,
    videoUrl,
    description,
    category,
    visible,
    averageRating,
    ratingCount,
    ratingTotal,
  } = req;

  if (code) {
    const video = {
      code,
      authorName,
      authorSurname,
      title,
      videoUrl,
      description,
      category,
      visible,
      averageRating,
      ratingCount,
      ratingTotal,
    };

    let categories = await categoryDao.listCategories();
    let result = [];
    let reject = [];

    if (Array.isArray(video.category)) {
      let categoriesIdArray = [];
      for (const id in categories) {
        categoriesIdArray.push(categories[id].categoryId);
      }

      for (let i = 0; i < video.category.length; i++) {
        if (categoriesIdArray.includes(video.category[i])) {
          result.push(video.category[i]);
        } else {
          reject.push(video.category[i]);
        }
      }
    } else {
      const e = new Error(`Invalid input data.`);
      e.code = "INVALID_DATA";
      throw e;
    }

   

    if (reject.length > 0 && result.length === 0) {
     
      const e = new Error(
        `Video not updated.`
      );
      e.code = "FAILED_TO_LOAD_CATEGORY";
      return res.status(400).json({ error: e });
    }

    video.category = result;
    try {
    let resultVideo = await dao.updateVideo(video);
      res.status(200).json(resultVideo);
    } catch (e) {
      if (e.code === "FAILED_TO_GET_VIDEO") {
        res.status(400).json({ error_message: e });
      } else if (e.code === "FAILED_TO_UPDATE_VIDEO") {
        res.status(500).json({ error_message: e });
      } else {
        res.status(500).json({ error_message: e });
      }
    }
  } else {
    res.status(400).json({
      error_message: "Invalid dtoIn",
    });
  }
}

module.exports = UpdateAbl;
