"use strict";

const path = require("path");
const CategoryDao = require("../../dao/category-dao");
let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

// caetgory list - accepts only category.name parameter
async function ListAbl(req, res) {
  let { categoryName } = req;

  if (
    !categoryName ||
    (categoryName &&
      typeof categoryName === "string" &&
      categoryName.length < 30)
  ) {
    try {
      let categoryList = await dao.listCategories(categoryName);

if (categoryName && categoryList.length === 0) {
  res.status(200).json({error_message: `Category with name ${categoryName} does not exist.`});
} else {
  res.status(200).json(categoryList);
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
