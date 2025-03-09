const homeController = require("../../http/controllers/api/home.controller");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const router = require("express").Router();
// swagger yaml commands
/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: api های صفحه اصلی وبسایت
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get all needed data for index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer YourToken...
 *      responses:
 *          200:
 *              description: success
 *          404: 
 *              description: not found
 */
router.get("/", VerifyAccessToken,homeController.indexPage);
module.exports = {
    HomeRoutes: router
}