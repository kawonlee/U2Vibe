const router = require("express").Router();
const multer = require("multer");

const { Upload } = require("../models/index.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploader = multer({ storage: storage });

// multer로 한개의 파일만 업로드 할 때
// router.post("/upload", uploader.single("img"), (req, res) => {
//   console.log(req.file);
//   console.log("파일 업로드");
//   console.log(req.body);

//   res.send("post ok! ");
// });

// multer로 서로 다른 name input객체의 파일을 업로드할 때
router.post(
  "/upload",
  uploader.fields([{ name: "file" }, { name: "img" }]),
  (req, res) => {
    console.log(req.files);

    res.send({
      fileName: req.files.file[0].filename,
      imgName: req.files.img[0].filename,
    });
  }
);
module.exports = router;
