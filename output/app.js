"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var pagosbg_routes_js_1 = require("./routes/pagosbg.routes.js");
var App = /** @class */ (function () {
    function App(port) {
        this.port = port;
        this.pagosBgRoutes = new pagosbg_routes_js_1.PagosBgRoutes();
        this.app = (0, express_1.default)();
        this.initialize();
    }
    App.prototype.initialize = function () {
        this.app.set("port", this.port || process.env.PORT || 3000);
        this.middleware();
        this.routes();
    };
    App.prototype.middleware = function () {
        //morgan
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //logger
    };
    App.prototype.routes = function () {
        this.pagosBgRoutes.routes(this.app);
    };
    App.prototype.listen = function () {
        this.app.listen(this.app.get("port"));
        console.log("Listening on port", this.app.get("port"));
    };
    return App;
}());
exports.App = App;
