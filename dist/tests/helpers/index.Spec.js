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
const supertest_1 = __importDefault(require("supertest"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("../../index"));
//Creat supertest object
let request = (0, supertest_1.default)(index_1.default);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
describe('Check the image info ', () => {
    it('check if image transformer Done ', () => {
        const TS = () => {
            const ex = 'jpeg';
            const wd = 300;
            const hg = 200;
            const im = '1';
            (0, sharp_1.default)(`dist/images/${im}.jpg`)[`${ex}`]()
                .resize(Number(wd), Number(hg))
                .toFile(`dist/images/newfold/${im}-${wd}-${hg}.${ex}`);
            return `dist/images/newfold/${im}-${wd}-${hg}.${ex}`;
        };
        expect(TS()).toEqual('dist/images/newfold/1-300-200.jpeg');
    });
    it('Check if the image exists after transform ', () => {
        const TS = () => {
            const ex = 'jpeg';
            const wd = 300;
            const hg = 200;
            const im = '1';
            fs_1.default.existsSync(`/images/newfold/${im}-${wd}-${hg}.${ex}`);
            return `dist/images/newfold/${im}-${wd}-${hg}.${ex}`;
        };
        expect(TS()).toEqual('dist/images/newfold/1-300-200.jpeg');
    });
    it('Check if the image exists Befor transform ', () => {
        const TS = () => {
            const ex = 'jpg';
            const im = '1';
            fs_1.default.existsSync(`/images/newfold/${im}.${ex}`);
            return `dist/images/newfold/${im}.${ex}`;
        };
        expect(TS()).toEqual('dist/images/newfold/1.jpg');
    });
});
describe('Check All endpoints ', function () {
    it('gets the "/" endpoint', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('gets the "/api" endpoint', () => __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = yield request.get('/api', (req, res) => {
            let ex = req.query.ex;
            let wd = req.query.width;
            let hg = req.query.height;
            let im = req.query.imageName;
            if (fs_1.default.existsSync(`dist/images/newfold/${im}-${wd}-${hg}.${ex}`))
                expect(response.status).toBe(200);
        });
    }));
});
