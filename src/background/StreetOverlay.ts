import {Actor, Color, Engine, vec, Vector} from "excalibur";

export class StreetOverlay extends Actor {
    constructor( pos : Vector) {
        super({
            pos,
            anchor: vec(0, 0),
            z: 5,
            color: Color.fromHex('#ffffff'),
            height:233,
            width: 1280
        });
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);

        this.graphics.opacity = 0;
    }
}