"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
exports.default = {
    upload(folder) {
        return {
            storage: multer_1.default.diskStorage({
                destination: (0, path_1.resolve)(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto_1.default.randomBytes(16).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;
                    return callback(null, fileName);
                }
            })
        };
    }
};
