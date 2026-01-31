import * as ex from "excalibur";
import {Resources} from "../resources";


export class StreetForeground extends ex.Actor {
    constructor( pos : ex.Vector) {
        super({
            pos,
            anchor: ex.vec(0, 0),
            z: 2
        });

    }
    override onInitialize(): void {
        const foreground = Resources.StreetFG.toSprite();
        this.graphics.use(foreground);
    }

}