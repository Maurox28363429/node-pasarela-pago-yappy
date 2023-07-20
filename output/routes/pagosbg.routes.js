"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagosBgRoutes = void 0;
var pagosbg_controller_js_1 = __importDefault(require("../controllers/pagosbg.controller.js"));
var PagosBgRoutes = /** @class */ (function () {
    function PagosBgRoutes() {
        this.pagosbg = new pagosbg_controller_js_1.default();
    }
    PagosBgRoutes.prototype.routes = function (app) {
        var _this = this;
        app
            .route("/api/pagosbgurl")
            .post(function (req, res) { return _this.pagosbg.getUrl(req, res); });
        app
            .route("/api/pagosbg")
            .get(function (req, res) {
            return _this.pagosbg.updateOrderStatus(req, res);
        });
    };
    return PagosBgRoutes;
}());
exports.PagosBgRoutes = PagosBgRoutes;
