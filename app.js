"use strict";

const express = require("express");
const path = require('path');

const videoRouter = require("./controller/video-controller");
const categoryRouter = require("./controller/category-controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/video", videoRouter);
app.use("/category", categoryRouter);

app.use("/spa.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/core/spa.js'));
});

app.use("/lsi.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/config/lsi.js'));
});

app.use("/css.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/config/css.js'));
})

app.use("/config-error.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/config/errors.js'));
});

app.use("/config-createform.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/config/createform.js'));
});

app.use("/left.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/core/left.js'));
});

app.use("/home.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/routes/home.js'));
});

app.use("/about.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/routes/about.js'));
});

app.use("/config-video.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/config/video.js'));
});

app.use("/about-config.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/config/about.js'));
}); 

app.use("/route-video-detail.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/routes/video-detail.js'));
});


app.use("/video-create-form.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/video-create-form.js'));
});

app.use("/video-detail.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/video-detail.js'));
});

app.use("/category-create.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/category-create.js'));
});

app.use("/video-list.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/video-list.js'));
});

app.use("/video-update-form.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/video-update-form.js'));
});

app.use("/video-provider.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/video-provider.js'));
});

app.use("/video-create.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/video-create.js'));
});

app.use("/video.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/video.js'));
});

app.use("/category-update-form.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/category-update-form.js'));
});

app.use("/category.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/category.js'));
});

app.use("/config-category.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/config/category.js'));
});

app.use("/category-create.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/category-create.js'));
});

app.use("/category-create-form.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/category-create-form.js'));
});

app.use("/category-provider.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/category-provider.js'));
});

app.use("/category-list.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/bricks/category-list.js'));
});

app.use("/categories.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/routes/categories.js'));
});

app.use("/not-found.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/routes/not-found.js'));
});

app.use("/calls.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/calls.js'));
});

app.use("/string-helper.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/helpers/string-helper.js'));
});

app.use("/index.js", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/index.js'));
});

app.get("/*", function(req,res) {
  res.sendFile(path.join(__dirname+'/hi/src/index.html'));
});

app.listen(3000, () => {
  console.log("Express server listening on port 3000.");
});
