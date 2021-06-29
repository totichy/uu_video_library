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

// load validation schema
const Ajv = require("ajv").default;
const { createVideoSchema } = require("../../schemas/video-schemas");

// accepts object as parameter
async function CreateAbl(req, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(createVideoSchema, req);

  if (!valid) {
    return res.status(400).json({ error: ajv.errors });
  }

  const video = {
    code: req.code,
    authorName: req.authorName,
    authorSurname: req.authorSurname,
    title: req.title,
    videoUrl: req.videoUrl,
    description: req.description,
    category: req.category,
    visible: req.visible,
    averageRating: req.averageRating,
    ratingCount: req.ratingCount,
    ratingTotal: req.ratingTotal,
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
    return res.status(400).json({ error: e });
  }

  if (reject.length > 0 && result.length === 0) {
    const e = new Error(`Video not saved.`);
    e.code = "FAILED_TO_LOAD_CATEGORY";
    return res.status(400).json({ error: e });
  }

  video.category = result;

  try {
    await dao.addVideo(video);
    res.status(200).json(video);
  } catch (e) {
    if (e.code === "DUPLICATE_CODE" || e.code === "DUPLICATE_URL") {
      res.status(400).json({ error: e });
    } else if (e.code === "FAILED_TO_STORE_VIDEO") {
      res.status(500).json({ error: e });
    } else {
      res.status(500).json({ error: e });
    }
  }
}

module.exports = CreateAbl;
