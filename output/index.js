"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var cors_1 = __importDefault(require("cors"));
var yappy = __importStar(require("yappy-node-back-sdk"));
var dotenv_1 = __importDefault(require("dotenv"));
// Create a transporter object using SMTP
var transporter = nodemailer_1.default.createTransport({
    host: 'mail.mauricioreyesdev.com',
    port: 465,
    secure: true,
    auth: {
        user: 'info@mauricioreyesdev.com',
        pass: 'Maurox$123' // Your email password
    }
});
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
dotenv_1.default.config();
app.post('/mailer', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, mailOptions;
    return __generator(this, function (_a) {
        data = req.body;
        mailOptions = {
            from: data.email,
            to: data.to,
            subject: data.subject,
            html: data.html // html body
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(500).send(error.message);
            }
            else {
                res.send(info);
            }
        });
        return [2 /*return*/];
    });
}); });
app.post("/pagosbgurl", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, yappyClient, payment, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                yappyClient = yappy.createClient(data.clientId, data.clientSecret);
                payment = {
                    total: data.total,
                    subtotal: data.subtotal,
                    shipping: data.shipping,
                    discount: data.discount,
                    taxes: data.taxes,
                    orderId: data.orderId,
                    successUrl: data.successUrl,
                    failUrl: data.failUrl,
                    tel: data.tel,
                    domain: 'https://yappymicroservicio.phoenixtechsa.com',
                };
                console.log(payment);
                return [4 /*yield*/, yappyClient.getPaymentUrl(payment)];
            case 1:
                response = _a.sent();
                if (!response.success) {
                    res.status(500).send(response);
                }
                else {
                    res.send(response);
                }
                return [2 /*return*/];
        }
    });
}); });
/* app.post(
  "/pagosbg",
  (req: Request<any, any, any, ValidatorParams>, res: Response) => {
    const success = yappyClient.validateHash(req.query);
    if (success) {
      //Your bussiness logic
    console.log(success);
    }
  }
); */
var port = 4200;
app.listen(port, function () { return console.log("Listening on port ".concat(port)); });
