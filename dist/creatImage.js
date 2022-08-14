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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sharp_1 = __importDefault(require("sharp"));
const fs = __importStar(require("fs"));
const app_1 = __importDefault(require("./app"));
//Creat router
const router_creat = (0, express_1.Router)();
router_creat.use('/api', (req, res, nxt) => {
    //Check if output folder not exists
    if (fs.existsSync('images/newfold') === false) {
        //Creat output folder 
        fs.mkdir('dist/images/newfold', (err) => {
            err ? console.log('Folder Not Created!!!', err) : '';
        });
    }
    nxt();
});
router_creat.use(app_1.default);
router_creat.all('/api', (req, res, nxt) => {
    let ex = req.query.ex;
    let wd = req.query.width;
    let hg = req.query.height;
    let im = req.query.imageName;
    //Check if the image choosen is  not exsits 
    if (fs.existsSync(`dist/images/newfold/${im}-${wd}-${hg}.${ex}`) === false) {
        //Creat the image after transform it 
        (0, sharp_1.default)(`dist/images/${im}.jpg`)[`${ex}`]()
            .resize(Number(wd), Number(hg))
            .toFile(`dist/images/newfold/${im}-${wd}-${hg}.${ex}`);
    }
    nxt();
});
router_creat.all('/api', (req, res, nxt) => __awaiter(void 0, void 0, void 0, function* () {
    let ex = req.query.ex;
    let wd = req.query.width;
    let hg = req.query.height;
    let im = req.query.imageName;
    if (fs.existsSync(`dist/images/newfold/${im}-${wd}-${hg}.${ex}`) === false) {
        yield (0, sharp_1.default)(`dist/images/${im}.jpg`)[`${ex}`]()
            .resize(Number(wd), Number(hg))
            .toFile(`dist/images/newfold/${im}-${wd}-${hg}.${ex}`);
    }
    nxt();
}));
exports.default = router_creat;
