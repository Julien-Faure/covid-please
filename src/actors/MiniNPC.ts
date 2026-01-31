import * as ex from "excalibur";
import {Engine} from "excalibur";

export class MiniNPC extends ex.Actor {

    constructor(pos: ex.Vector, direction: boolean, speed: number) {

        const directionFactor = direction ? -1 : 1;
        super({
            pos,
            anchor: ex.vec(0, 0),
            width: 10,
            height: 10,
            color: ex.Color.fromHex('#4500f3'),
            vel: ex.vec(directionFactor * speed, 0),
            z: 2
        });
    }


    onInitialize(engine: Engine) {
        super.onInitialize(engine);

        this.on('exitviewport', () => this.kill());
        this.on('pointerdown', () => {
            this.color = ex.Color.fromHex('#f30000');

        })
    }
}