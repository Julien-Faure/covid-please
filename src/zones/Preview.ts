import * as ex from "excalibur";
import {Resources} from "../resources";


export class Preview extends ex.Actor {
    constructor(pos : ex.Vector) {
        super({
            pos,
            anchor: ex.vec(0, 0),
            height: 365,
            width: 200,
            color: ex.Color.fromHex('#4500f3'),
            z: 1
        });
    }

    override onInitialize(): void {
        const background = Resources.Preview.toSprite();
        this.graphics.use(background);
    }
}