import {Actor, Color, Engine,  Rectangle, Vector} from "excalibur";


export class PunishButton extends Actor {
    constructor(pos : Vector) {
        super({pos, height: 100, width: 100, z: 100});
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);

        this.graphics.use(new Rectangle({
            color: Color.fromHex( '#ff0000'),
            width: this.width, height: this.height,
        }));
    }
}