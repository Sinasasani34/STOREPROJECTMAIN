const { ProductController } = require("../../http/controllers/admin/product/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.patch("/edit/:id", uploadFile.array("images", 10), stringToArray("tags"), ProductController.editProduct)
router.delete("/remove/:id", ProductController.removeProductById)
router.get("/:id", ProductController.getOneProduct)
router.get("/list", ProductController.getAllProducts)
router.post("/add", uploadFile.array("images", 10), stringToArray("tags"), ProductController.addProduct)

module.exports = {
    AdminApiProductRouter: router
}