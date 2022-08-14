"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const creatImage_1 = __importDefault(require("./creatImage"));
const router_show = (0, express_1.Router)();
router_show.use(creatImage_1.default);
router_show.use('/api', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ex = req.query.ex;
    let wd = req.query.width;
    let hg = req.query.height;
    let im = req.query.imageName;
    let pth = path_1.default.join(__dirname, `/images/newfold/${im}-${wd}-${hg}.${ex}`);
    yield res.status(200).sendFile(pth);
}));
exports.default = router_show;
