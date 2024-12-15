const { CategoryController } = require("../../http/controllers/admin/category/category.controller");

const router = require("express").Router();

// adding category
router.post("/add", CategoryController.addCategory)

// get parent of category
router.get("/parents", CategoryController.getAllParents)

// get child of parents
router.get("/children/:parent", CategoryController.getChildOfParents)

// get all categories
router.get("/all", CategoryController.getAllCategory)

// remove category
router.delete("/remove/:id", CategoryController.removeCategory)

// get all category with out any populate 
router.get("/list-of-all", CategoryController.getAllCategoryWithoutPopulate)

// get one category with id
router.get("/:id", CategoryController.getCategoryById)

// update category
router.patch("/update/:id", CategoryController.editCategoryTitle)

module.exports = {
    AdminApiCategoryRouter: router,
}