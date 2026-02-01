import {Actor, Engine, vec, Vector} from "excalibur";
import {Resources} from "../resources";


export class Tram extends Actor {
    constructor(pos: Vector, direction: boolean) {
        const directionFactor = direction ? -1 : 1;
        super({
            pos,
            anchor: vec(0, 0),
            height: 40,
            width: 245,
            vel: vec(directionFactor * 45, 0),
            z: 2
        });
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);

        this.graphics.use(Resources.Tram1.toSprite());

        this.on('exitviewport', () => this.kill());
    }
}