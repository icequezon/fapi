"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const router_1 = require("./src/routers/router");
const apiRouter_1 = require("./src/routers/apiRouter");
const appErrorMiddleware_1 = require("./src/middleware/appErrorMiddleware");
//For env File 
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "src/views")); // Folder for templates
app.use("/", router_1.router);
app.use("/api", apiRouter_1.router);
app.use(appErrorMiddleware_1.appErrorHandler);
app.listen(port, () => {
    console.log(`SAPI is running on https://localhost:${port}`);
});
