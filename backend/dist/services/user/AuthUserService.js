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
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email,
                }
            });
            if (!user) {
                throw new Error('User/password incorrect');
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new Error('User/password incorrect');
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email,
            }, '  ', // generate token in https://www.md5hashgenerator.com/
            {
                subject: user.id,
                expiresIn: '30d',
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token,
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
