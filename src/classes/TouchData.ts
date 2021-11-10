export class TouchData {
  x0: number;
  y0: number;
  vx: number;
  vy: number;
  dx: number;
  dy: number;
  moveX: number;
  moveY: number;
  numberActiveTouches: number;
  stateID: number;

  constructor(props: TouchData) {
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
}
