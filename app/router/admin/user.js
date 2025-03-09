const { UserController } = require("../../http/controllers/admin/users/user.controller");
// const { checkPermission } = require("../../http/middlewares/permission.guard");
// const { PERMISSIONS } = require("../../utils/constans");
const router = require("express").Router();
router.get("/list", UserController.getAllUsers)
router.patch("/update-profile", UserController.updateUserProfile)

module.exports = {
    AdminApiUserRouter: router
}