"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchData = void 0;
var TouchData = /** @class */ (function () {
    function TouchData(props) {
        this.x0 = props.x0;
        this.y0 = props.y0;
        this.vx = props.vx;
        this.vy = props.vy;
        this.dx = props.dx;
        this.dy = props.dy;
        this.moveX = props.moveX;
        this.moveY = props.moveY;
        this.numberActiveTouches = props.numberActiveTouches;
        this.stateID = props.stateID;
    }
    return TouchData;
}());
exports.TouchData = TouchData;
