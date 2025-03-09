const { graphqlHTTP } = require("express-graphql");
const { VerifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRoutes } = require("./user/auth");
const { grapgQLConfog } = require("../utils/graphql");
const { SupportSectionRouter } = require("./support/support.routes");

const router = require("express").Router();
router.use("/user", UserAuthRoutes)
router.use("/admin", VerifyAccessToken, AdminRoutes)
router.use("/developer", DeveloperRoutes)
router.use("/", HomeRoutes)
router.use("/support", SupportSectionRouter)
module.exports = {
    AllRoutes: router
}