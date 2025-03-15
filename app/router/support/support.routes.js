const { SupportController } = require("../../http/controllers/support/support.controller");
const { ApiNamespaceRouter } = require("./namespace.routes");
const { ApiRoomRouter } = require("./room.routes");

const router = require("express").Router();
router.use("/namespace", ApiNamespaceRouter);
router.use("/room", ApiRoomRouter)
router.get("/login", SupportController.loginForm)
router.post("/login", SupportController.login)
router.get("/", SupportController.renderChatRoom)
module.exports = {
    SupportSectionRouter: router
}