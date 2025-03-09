const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
require("dotenv").config();
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createError = require("http-errors")
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc")
const cors = require("cors")
const expresseEjsLayouts = require("express-ejs-layouts");
const { initialSocket } = require("./utils/initSocket");
const { socketHandller } = require("./socket.io");
module.exports = class Application {
    #app = express();
    #DB_URL;
    #PORT;
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URL = DB_URI;
        this.configApplication();
        this.initTemplateEngin();
        this.connectToMongoDB();
        this.initRedis();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }
    configApplication() {
        this.#app.use(cors())
        this.#app.use(morgan("dev"))
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: "Online Shop Store",
                    version: "1.0.0",
                    description: "بزرگترین آنلاین شاپ محصولات کامپیوتری مخصوص تخصصی کارا",
                    contact: {
                        name: "Sina Sasani",
                        url: "http://localhost:3900",
                        email: "brsina504@gmail.com"
                    }
                },
                servers: [{
                    url: "http://localhost:3900"
                }],
                components: {
                    securitySchemes: {
                        BearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT",
                        }
                    }
                },
                security: [{ BearerAuth: [] }]
            },
            apis: ["./app/router/**/*.js"]
        }), { explorer: true }))
    }
    createServer() {
        const http = require("http");
        const server = http.createServer(this.#app)
        const io = initialSocket(server);
        socketHandller(io);
        server.listen(this.#PORT, () => {
            console.log("run > http://localhost:" + this.#PORT);
        })
    }
    connectToMongoDB() {
        mongoose.set("strictQuery", false);
        mongoose.connect(this.#DB_URL).then(() => {
            console.log("Connected to MongoDB");
        }).catch((err) => {
            console.log("error > " + err);
        })

        mongoose.connection.on("connected", () => {
            console.log("Mongoose Connected to DB")
        })
        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose DisConnected to DB")
        })
        // closeing DB Connection
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("disconnected")
            process.exit(0);
        })
    }

    initRedis() {
        require("./utils/initRedis")
    }

    initTemplateEngin() {
        this.#app.use(expresseEjsLayouts);
        this.#app.set("view engine", "ejs");
        this.#app.set("views", "resource/views");
        this.#app.set("layout extractStyles", true)
        this.#app.set("layout extractScripts", true)
        this.#app.set("layout", "./layouts/master")
    }

    createRoutes() {
        this.#app.use(AllRoutes);
    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("آدرس مورد نظر یافت نشد"))
        })
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError();
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                errors: {
                    statusCode,
                    message
                }
            })
        })
    }
}