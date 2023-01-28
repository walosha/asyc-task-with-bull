const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const sharp = require("sharp");
const fileUpload = require("express-fileupload");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(fileUpload());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("form");
});

app.post("/upload", async function (req, res) {
  const { image } = req.files;

  if (!image) return res.sendStatus(400);
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
