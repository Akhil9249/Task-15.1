const path =require('path')
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

exports.upload = multer({ storage: storage });