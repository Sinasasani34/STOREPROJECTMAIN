const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");

const router = require("express").Router();

/**
 * @swagger
 *  tages: 
 *      -   name: Admin-Panel
 *          descritption: action of admin (add, remove, edit, .......)
 *      -   name: Category(Admin-Panel)
 *          descritption: all methods and routes about category section
 *      -   name: Blig(Admin-Panel)
 *          descritption: make blog managment admin panel
 */


router.use("/category", CategoryRoutes)
router.use("/blogs", VerifyAccessToken,BlogAdminApiRoutes)
module.exports = {
    AdminRoutes: router
}