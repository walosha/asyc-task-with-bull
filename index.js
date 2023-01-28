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

app.get("/result", (req, res) => {
  const imgDirPath = path.join(__dirname, "./public/images");
  let imgFiles = fs.readdirSync(imgDirPath).map((image) => {
    return `images/${image}`;
  });
  res.render("result", { imgFiles });
});

app.post("/upload", async function (req, res) {
  const { image } = req.files;

  if (!image) return res.sendStatus(400);
  const imageName = path.parse(image.name).name;
  const processImage = (size) =>
    sharp(image.data)
      .resize(size, size)
      .webp({ lossless: true })
      .toFile(`./public/images/${imageName}-${size}.webp`);

  sizes = [90, 96, 120, 144, 160, 180, 240, 288, 360, 480, 720, 1440];
  Promise.all(sizes.map(processImage));
  let counter = 0;
  for (let i = 0; i < 10_000_000_000_000_000; i++) {
    counter++;
  }

  res.redirect("/result");
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
