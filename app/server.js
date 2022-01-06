import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http"
import expressEjsLayouts from "express-ejs-layouts"
import path from "path";
import {fileURLToPath} from "url";
import AllRoutes from "./routes/routes.js"
import resolvePath from "./http/middlewares/resolvePath.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import adminRoutes from "./routes/admin/index.js"
import cors from "cors"
dotenv.config();
const app = express();
export default class Application{
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
        app.set("view engine", "ejs")
        app.use(expressEjsLayouts);
        app.set("views","resource/views");
        app.set("layout extractScripts", true);
        app.set("layout extractStyles", true);
        // app.set('layout', './layouts/master');
        
        
    }
    databaseConnection(){
        mongoose.connect("mongodb://localhost:27017/yadaki").then(() => {
            console.log("Run > connect To DB Successfuly");
        })
        .catch(err => {
            console.log("Faild > Can not Connect To DB");
        })
    }
    createServer(){
        const server = http.createServer(app);
        server.listen(+process.env.PORT || 5000, () => {
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
                ...err,
                message, 
                messages,
            })
        })
    }
}