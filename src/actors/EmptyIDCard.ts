import * as ex from "excalibur";
import {Engine} from "excalibur";
import {Resources} from "../resources";

export class EmptyIDCard extends ex.Actor {
    constructor(pos : ex.Vector) {
        super({
            pos,
            anchor: ex.vec(0, 0),
            width: 225,
            height: 150,
            z: 3
        });
    }


    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        let idCardSprite = Resources.IDCard.toSprite();
        idCardSprite.width = this.width;
        idCardSprite.height = this.height
        this.graphics.use(idCardSprite);
    }
}

