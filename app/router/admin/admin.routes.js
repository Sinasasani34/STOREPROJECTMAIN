const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { AdminApiBlogRouter } = require("./blog");
const { AdminApiCategoryRouter } = require("./category");
const { AdminApiChapterRoutes } = require("./chapter");
const { AdminApiCourseRouter } = require("./course");
const { AdminApiEpisodeRouter } = require("./episode");
const { AdminApiProductRouter } = require("./product");

const router = require("express").Router();

router.use("/category", AdminApiCategoryRouter)
router.use("/blogs", AdminApiBlogRouter)
router.use("/products", AdminApiProductRouter)
router.use("/courses", AdminApiCourseRouter)
router.use("/chapter", AdminApiChapterRoutes)
router.use("/episode", AdminApiEpisodeRouter)
module.exports = {
    AdminRoutes: router
}