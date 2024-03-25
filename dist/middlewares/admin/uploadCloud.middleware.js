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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = exports.uploadSingle = void 0;
const upload_to_cloudinary_helper_1 = require("../../helpers/upload-to-cloudinary.helper");
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, upload_to_cloudinary_helper_1.uploadToCloudinary)(req["file"].buffer);
        req.body[req["file"].fieldname] = result;
    }
    catch (error) {
        console.log(error);
    }
    next();
});
exports.uploadSingle = uploadSingle;
const uploadFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const key in req["files"]) {
            req.body[key] = [];
            const array = req["files"][key];
            for (const item of array) {
                try {
                    const result = yield (0, upload_to_cloudinary_helper_1.uploadToCloudinary)(item.buffer);
                    req.body[key].push(result);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    next();
});
exports.uploadFields = uploadFields;
