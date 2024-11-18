const { CategoryRoutes } = require("./category");

const router = require("express").Router();

/**
 * @swagger
 *  tages: 
 *      name: Admin-Panel
 *      descritption: action of admin (add, remove, edit, .......)
 */


router.use("/category", CategoryRoutes)
module.exports = {
    AdminRoutes: router
}