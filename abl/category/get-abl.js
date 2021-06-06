"use strict";

const path = require("path");
const CategoryDao = require("../../dao/category-dao");
let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

// get category - accepts only category.code parameter
async function GetAbl(req, res) {
  let { categoryId } = req;

  if (categoryId && (typeof categoryId !== "string" || categoryId.length !== 3)) {
    return res.status(400).json({
      error_message: "Invalid input: code parameter is missing or is invalid.",
    });
  }
  try {
  const category = await dao.getCategory(categoryId);

  if (!category) {
    return res.status(400).json({
      error_message: `Category with code '${categoryId}' doesn't exist.`,
    });
  }
  res.status(200).json(category);
} catch (e) {
  if (e.code === "FAILED_TO_LOAD_CATEGORY") {
    return res.status(400).json({ error: e });
  } else {
    return res.status(500).json({ error: e });
  }
}
}

module.exports = GetAbl;
