import * as ex from "excalibur";
import {Resources} from "../resources";
import {Engine} from "excalibur";



export class EmptyAttestation extends ex.Actor {
    constructor(pos : ex.Vector) {
        super({
            pos,
            anchor: ex.vec(0, 0),
            width: 248,
            height: 351,
            z: 2
        });
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        let attestationSprite = Resources.Attestation.toSprite();
        attestationSprite.width = this.width;
        attestationSprite.height = this.height
        this.graphics.use(attestationSprite);
    }
}

