import * as ex from "excalibur";
import {Resources} from "../resources";


export class StreetFountain extends ex.Actor {
    constructor( pos : ex.Vector) {
        super({
            pos,
            anchor: ex.vec(0, 0),
            z: 5
        });

    }
    override onInitialize(): void {
        const fountain = Resources.StreetFountain.toSprite();
        this.graphics.use(fountain);
    }

}