import {Actor, Engine, GraphicsGroup, vec, Vector} from "excalibur";
import {Resources} from "../resources";


export class Life extends Actor {
    constructor(pos: Vector) {
        super({
            pos,
            height: 50, width: 100,
            z: 100
        });
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);

        const heart = Resources.HeartFull.toSprite();
        heart.destSize = {
            width: 30, height: 30
        }

        const group = new GraphicsGroup({
            members: [
                { graphic: heart.clone(), offset: vec(0, 0) },
                { graphic: heart.clone(), offset: vec(35, 0) },
                { graphic: heart.clone(), offset: vec(70, 0) },
            ],
        });

        this.graphics.use(group);
    }
}