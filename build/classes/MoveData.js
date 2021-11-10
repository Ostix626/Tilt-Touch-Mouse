"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveData = void 0;
var MoveData = /** @class */ (function () {
    function MoveData(props) {
        this.click = props.click;
        this.touch = props.touch;
        this.gyro = props.gyro;
        this.acc = props.acc;
    }
    return MoveData;
}());
exports.MoveData = MoveData;
