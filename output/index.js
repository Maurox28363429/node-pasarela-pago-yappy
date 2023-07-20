"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_js_1 = require("./app.js");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function main() {
    var app = new app_js_1.App(process.env.PORT);
    app.listen();
}
main();
