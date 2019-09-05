"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
var typedi_1 = require("typedi");
var ExpressConfig = /** @class */ (function () {
    function ExpressConfig() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.setUpExpressServer();
    }
    /**
     * Set up express server
     * @return { express.Application }
     */
    ExpressConfig.prototype.setUpExpressServer = function () {
        routing_controllers_1.useContainer(typedi_1.Container);
        typeorm_1.useContainer(typedi_1.Container);
        var controllersPath = path.resolve('build', 'service-layer/controllers');
        return routing_controllers_1.useExpressServer(this.app, {
            controllers: [controllersPath + '/*.js'],
            cors: true
        });
    };
    return ExpressConfig;
}());
exports.ExpressConfig = ExpressConfig;
//# sourceMappingURL=ExpressConfig.js.map