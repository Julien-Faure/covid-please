import * as ex from "excalibur";
import {Resources} from "../resources";


export class StreetBackground2 extends ex.Actor {
    constructor( pos : ex.Vector) {
        super({
            pos,
            anchor: ex.vec(0, 0),
            z: -1
        });

    }
    override onInitialize(): void {
        const background = Resources.StreetBG2.toSprite();
        this.graphics.use(background);
    }

}