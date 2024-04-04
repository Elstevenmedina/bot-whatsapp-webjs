"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullDate = exports.getMonth = exports.getMoment = exports.getDate = exports.getDayWeek = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
require("moment/locale/es");
(0, moment_timezone_1.default)().tz('America/Caracas').format();
const getDayWeek = () => (0, moment_timezone_1.default)().tz('America/Caracas').format('dddd');
exports.getDayWeek = getDayWeek;
const getDate = () => (0, moment_timezone_1.default)().tz('America/Caracas').format('DD/MM/YYYY');
exports.getDate = getDate;
const getMoment = () => (0, moment_timezone_1.default)();
exports.getMoment = getMoment;
const getMonth = (monthNumber) => (0, moment_timezone_1.default)().month(parseInt(monthNumber) - 1).format('MMMM');
exports.getMonth = getMonth;
const getFullDate = () => (0, moment_timezone_1.default)().tz('America/Caracas').format('DD/MM/YYYY HH:mm');
exports.getFullDate = getFullDate;
