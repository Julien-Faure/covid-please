import * as ex from "excalibur";
import {Resources} from "../resources";

export class DeskBackground extends ex.Actor {
    constructor(pos : ex.Vector) {
        super({
            pos,
            anchor: ex.vec(0, 0),
            z: 1
        });
    }

    override onInitialize(): void {
        const background = Resources.Desk.toSprite();
        this.graphics.use(background);
    }
}