const { SupportController } = require("../../http/controllers/support/support.controller");
const { checkLogin, checkAccessLogin } = require("../../http/middlewares/auth");
const { ApiNamespaceRouter } = require("./namespace.routes");
const { ApiRoomRouter } = require("./room.routes");

const router = require("express").Router();
router.use("/namespace", ApiNamespaceRouter);
router.use("/room", ApiRoomRouter)
router.get("/login", checkAccessLogin, SupportController.loginForm)
router.post("/login", checkAccessLogin, SupportController.login)
router.get("/", checkLogin, SupportController.renderChatRoom)
module.exports = {
    SupportSectionRouter: router
}