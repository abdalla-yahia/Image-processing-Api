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
//Creat router
const router_creat = (0, express_1.Router)();
const arr_Names = ['1', '2', '3', '4', '5'];
const arr_Extension = ['jpeg', 'jpg', 'png', 'gif'];
router_creat.all('/api', (req, res, nxt) => __awaiter(void 0, void 0, void 0, function* () {
    const ex = req.query.ex;
    const wd = req.query.width;
    const hg = req.query.height;
    const im = req.query.imageName;
    //Check if the image choosen is  not exsits
    if (fs.existsSync(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`) === false) {
        if (!im) {
            return res
                .status(400)
                .send('<h1>Oh no... the <span style="color:red">Name</span> of the picture is missing...! </h1>');
        }
        else if (!arr_Names.includes(im)) {
            return res
                .status(400)
                .send('<h1>Impossible... <span style="color:red">Picture Name</span> not found...!</h1>');
        }
        else if (!ex) {
            return res
                .status(400)
                .send('<h1>Oops....the image <span style="color:red">Extension</span> is missing !!</h1>');
        }
        else if (!arr_Extension.includes(ex)) {
            return res
                .status(400)
                .send('<h1>Impossible... <span style="color:red">Picture Extension </span> not found...!</h1>');
        }
        else if (!wd) {
            return res
                .status(400)
                .send('<h1>how are you ?? The image <span style="color:red">Width</span> is missing...</h1> ');
        }
        else if (wd === '0') {
            return res
                .status(400)
                .send('<h1>Impossible... The <span style="color:red"> Type of Width</span> you entered for the image is <span style="color:orange">ZERO</span>...</h1>');
        }
        else if (wd.match(/\D/g)) {
            return res
                .status(400)
                .send('<h1>Impossible... The <span style="color:red"> Type of Width</span> you entered for the image is unknown...</h1>');
        }
        else if (!hg) {
            return res
                .status(400)
                .send('<h1>No way... the <span style="color:red">Height</span> of the image is missing...</h1>');
        }
        else if (hg === '0') {
            return res
                .status(400)
                .send('<h1>Impossible... The <span style="color:red"> Type of Height</span> you entered for the image is <span style="color:orange">ZERO</span>...</h1>');
        }
        else if (hg.match(/\D/g)) {
            return res
                .status(400)
                .send('<h1>Impossible... The <span style="color:red"> Type of Height</span> you entered for the image is unknown...</h1>');
        }
        else {
            yield (0, sharp_1.default)(`src/images/${im}.jpg`)
                .jpeg()
                .resize(Number(wd), Number(hg))
                .toFile(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`);
        }
    }
    nxt();
}));
exports.default = router_creat;
