// const { checkPermission } = require("../../http/middlewares/permission.guard");
// const { PERMISSIONS } = require("../../utils/constans");
const { AdminApiBlogRouter } = require("./blog");
const { AdminApiCategoryRouter } = require("./category");
const { AdminApiChapterRoutes } = require("./chapter");
const { AdminApiCourseRouter } = require("./course");
const { AdminApiEpisodeRouter } = require("./episode");
const { AdminApiPermissionRouter } = require("./permission");
const { AdminApiProductRouter } = require("./product");
const { AdminApiRoleRouter } = require("./role");
const { AdminApiUserRouter } = require("./user");


const router = require("express").Router();

router.use("/category", AdminApiCategoryRouter)
router.use("/blogs", AdminApiBlogRouter)
router.use("/products", AdminApiProductRouter)
router.use("/courses", AdminApiCourseRouter)
router.use("/chapter", AdminApiChapterRoutes)
router.use("/episode", AdminApiEpisodeRouter)
router.use("/user", AdminApiUserRouter)
router.use("/permission", AdminApiPermissionRouter)
router.use("/role", AdminApiRoleRouter)
module.exports = {
    AdminRoutes: router
}

// checkPermission([PERMISSIONS.CONTENT_MANAGER])
// checkPermission([PERMISSIONS.TEACHER])
// checkPermission([PERMISSIONS.SUPPLIER, PERMISSIONS.CONTENT_MANAGER])
// checkPermission([PERMISSIONS.TEACHER])
// checkPermission([PERMISSIONS.TEACHER])
// checkPermission([PERMISSIONS.TEACHER])
// checkPermission([PERMISSIONS.ALL])
// checkPermission(PERMISSIONS.ADMIN)