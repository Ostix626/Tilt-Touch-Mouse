import { TouchData } from "./TouchData";
import { GyroAccData } from "./GyroAccData";

export class MoveData {
  click: boolean;
  touch: TouchData;
  gyro: GyroAccData;
  acc: GyroAccData;

  constructor(props: MoveData) {
    this.click = props.click;
    this.touch = props.touch;
    this.gyro = props.gyro;
    this.acc = props.acc;
  }
}
