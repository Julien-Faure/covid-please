import * as ex from "excalibur";
import {SCREEN_SIZE} from "../config/Settings";


export class Street extends ex.Actor {
    constructor(pos : ex.Vector) {
        super({
            pos,
            anchor: ex.vec(0, 0),
            height: 175,
            width: SCREEN_SIZE.width,
            color: ex.Color.fromHex('#bd9853'),
            z: 1
        });
    }

}