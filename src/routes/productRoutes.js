// Módulos

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Controladores

const productController = require("../controllers/productController");

//Middlewares

const logProductMiddleware = require("../middlewares/logProductMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// Multer

const multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder = path.join(__dirname, "../../public/images/products");
    callback(null, folder);
  },
  filename: (req, file, callback) => {
    //console.log(file)
    let imageName = "product-" + Date.now() + path.extname(file.originalname);
    callback(null, imageName);
  },
});

let fileUpload = multer({ storage: multerDiskStorage });

// Ruteos

router.get("/", productController.products);
router.get("/detail/:id", productController.detail);
router.get("/create", authMiddleware, productController.create);
router.post( "/create",logProductMiddleware, fileUpload.single("imagen"),productController.store
);
router.get("/edit/:id", authMiddleware, productController.edit);
router.put("/edit/:id", fileUpload.single("imagen"), productController.actualizar);
router.delete("/delete/:id", productController.borrar);

module.exports = router;
