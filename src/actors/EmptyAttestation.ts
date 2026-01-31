import {Resources} from "../resources";
import {Sprite} from "excalibur";



export class EmptyAttestation extends Sprite {
    constructor(width : number, height : number) {
        super({
            image: Resources.Attestation,
            width, height
        });
    }
}

