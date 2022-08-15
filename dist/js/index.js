"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const creatImage_1 = __importDefault(require("./creatImage"));
const showImage_1 = __importDefault(require("./showImage"));
const app = (0, express_1.default)();
//Define the port to default 5000 or clint chooses
const port = process.env.PORT || 5000;
// Create a listening server
app.listen(port, () => {
    console.log(`Server Listenning at port ${port} ...`);
});
// Creat A middleware
app.use(express_1.default.static('dist'));
app.use(express_1.default.urlencoded({ extended: true }));
// add routing for root path
exports.Root = app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/dist/index.html'));
});
// Using the  middlewares
app.use(showImage_1.default);
app.use(creatImage_1.default);
//the /api endpoint
app.get('/api', (req, res) => {
    res.status(200).send('Image Not Found');
});
exports.default = app;
