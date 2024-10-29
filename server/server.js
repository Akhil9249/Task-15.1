const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const cors = require("cors");
const { upload } = require("./uploads/multer");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// pass
// fiwRFJJXvV3RlK2e
// mongodb+srv://akhilcv430:<password>@cluster0.srijh4k.mongodb.net/

const imagesFolder = path.join(__dirname, "./public/images");

app.get("/", (req, res) => {
    console.log("start get methode");

    fs.readdir(imagesFolder, (err, files) => {
        if (err) {
            console.log(err, "err");
            return res.status(500).json({ error: "Unable to read images folder" });
        }

        const images = files.map((file) => ({
            name: file,
            url: `/images/${file}`,
        }));

        console.log(images, "image");

        res.json(images);
    });

    // res.json({
    //     message: "Inside get Methode",
    // });
});

app.post("/upload", upload.single("upload_file"), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    fs.readdir(imagesFolder, (err, files) => {
      if (err) {
          console.log(err, "err");
          return res.status(500).json({ error: "Unable to read images folder" });
      }

      const images = files.map((file) => ({
          name: file,
          url: `/images/${file}`,
      }));

      console.log(images, "image");

      res.json(images);
  });
});



const PORT = 3001;
app.listen(PORT, () => console.log(`server started ${PORT}`));
