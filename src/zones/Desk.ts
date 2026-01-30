import * as ex from "excalibur";


export class Desk extends ex.Actor {
    constructor(pos : ex.Vector) {
        super({
            pos,
            anchor: ex.vec(0, 0),
            width: 760,
            height: 365,
            color: ex.Color.fromHex('#ff0008'),
            z: 1
        });
    }
}