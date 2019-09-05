"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var dotenv = require("dotenv");
var Application_1 = require("./middleware/config/Application");
dotenv.config();
exports.application = new Application_1.Application();
//# sourceMappingURL=index.js.map