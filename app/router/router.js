const redisClient = require("../utils/init-redis");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
(async() => {
    await redisClient.set("key", "value")
    const value = await redisClient.get("key")
    console.log(value)
})()
const router = require("express").Router();
router.use("/user", UserAuthRoutes)
router.use("/", HomeRoutes)
module.exports = {
    AllRoutes: router
}