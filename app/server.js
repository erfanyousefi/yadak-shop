const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const http = require("http")
const path = require("path")
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const AllRoutes = require("./routes/routes")

const cors = require ("cors")
dotenv.config();
const app = express();
module.exports = class Application{
    constructor(){
        this.applicationConfig();
        this.createServer();
        this.databaseConnection();
        this.routeHandler();
        this.expressErrorHandler();
    }
    applicationConfig(){
        app.use(cors())
        app.use(express.static(path.join(__dirname, ".." ,"public")));
        app.use(express.urlencoded({extended : true}));
        app.use(express.json());
        app.use(
            "/api-doc",
            swaggerUI.serve,
            swaggerUI.setup(
              swaggerJsDoc({
                swaggerDefinition: {
                  openapi: "3.0.0",
                  info: {
                    title: "Roghanicar Store",
                    version: "2.0.0",
                    description:
                      "بزرگترین مرجع فروش روغن موتور و فیلتر ",
                    contact: {
                      name: "Erfan Yousefi",
                      url: process.env.BACKEND,
                      email: "erfanyousefi.co@gmail.com",
                    },
                  },
                  servers: [
                    {
                      url: process.env.BACKEND
                    },
                    {
                      url: "  https://inspiring-lichterman-jhgusysru.iran.liara.run",
                    },
                    {
                      url: "  http://localhost:3000",
                    },
                  ],
                  components : {
                    securitySchemes : {
                      BearerAuth : {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                        
                      }
                    }
                  },
                  security : [{BearerAuth : [] }]
                },
                apis: ["./app/routes/**/*.js"],
              }),
              {explorer: true},
            )
        );
    }
    databaseConnection(){
      const {DB_URL} = process.env;
        mongoose.connect(DB_URL).then(() => {
            console.log("Run > connect To DB Successfuly");
        })
        .catch(err => {
            console.log("Faild > Can not Connect To DB");
        })
    }
    createServer(){
        const server = http.createServer(app);
        server.listen(+process.env.PORT || 3000, () => {
            console.log("Server > Run on Port " + process.env.PORT);
        })
    }
    routeHandler(){
        app.use(AllRoutes)
        app.use((req, res, next) => {
            return res.status(404).json({
                status : 404, 
                success : false,
                message : "مسیر یا آدرس مورد نظر یافت نشد"
            })
        })
    }
    expressErrorHandler(){
        app.use((err, req, res, next) => {
            const status = err.status || 500;
            const message = err.message || "خطای داخلی";
            const messages = err.messages || undefined;
            return res.status(status).json({
                status,
                success : false,
                message, 
                messages,
            })
        })
    }
}