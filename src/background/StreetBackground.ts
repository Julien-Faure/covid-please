import * as ex from "excalibur";
import {Resources} from "../resources";


export class StreetBackground extends ex.Actor {
    constructor( pos : ex.Vector) {
        super({
            pos,
            anchor: ex.vec(0, 0),
            color: ex.Color.fromHex('#bd9853'),
            z: 1
        });

    }
    override onInitialize(): void {
        const background = Resources.Street.toSprite();
        this.graphics.use(background);
    }

}