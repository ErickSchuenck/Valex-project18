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
        while (_) try {
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
import { faker } from '@faker-js/faker';
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import Cryptr from "cryptr";
import dayjs from "dayjs";
var cryptr = new Cryptr(process.env.SECRET);
export function createCard(employeeId, cardType) {
    return __awaiter(this, void 0, void 0, function () {
        var cardData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateCardData(employeeId, cardType)];
                case 1:
                    cardData = _a.sent();
                    return [4 /*yield*/, cardRepository.insert(cardData)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function generateCardData(employeeId, cardType) {
    return __awaiter(this, void 0, void 0, function () {
        var number, cardholderName, expirationDate, securityCode, cardData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    number = generateCardNumber();
                    return [4 /*yield*/, abbreviateName(employeeId)];
                case 1:
                    cardholderName = _a.sent();
                    expirationDate = dayjs(Date.now()).add(5, "year").format("MM-YY");
                    securityCode = generateSecurityCode();
                    cardData = {
                        employeeId: employeeId,
                        number: number,
                        cardholderName: cardholderName,
                        securityCode: securityCode,
                        expirationDate: expirationDate,
                        password: null,
                        isVirtual: false,
                        originalCardId: null,
                        isBlocked: true,
                        type: cardType
                    };
                    return [2 /*return*/, cardData];
            }
        });
    });
}
function generateCardNumber() {
    var cardGen = require('card-number-generator');
    return cardGen({ issuer: 'MasterCard' });
}
function abbreviateName(employeeId) {
    return __awaiter(this, void 0, void 0, function () {
        var info, name, namesArray, firstName, lastName, output, i, letters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, employeeRepository.findById(employeeId)];
                case 1:
                    info = _a.sent();
                    name = info.fullName;
                    namesArray = name.split(' ');
                    firstName = namesArray[0];
                    lastName = namesArray[namesArray.length - 1];
                    output = [];
                    for (i = 0; i < namesArray.length; i++) {
                        if (namesArray[i] === firstName || namesArray[i] === lastName) {
                            output.push(namesArray[i]);
                        }
                        else if (namesArray[i].length > 3) {
                            letters = namesArray[i].split('');
                            output.push(letters[0]);
                        }
                    }
                    return [2 /*return*/, output.join(' ')];
            }
        });
    });
}
function generateSecurityCode() {
    var cvc = faker.finance.creditCardCVV();
    return cryptr.encrypt(cvc);
}