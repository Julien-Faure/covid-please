import {Actor, Color, Engine, GraphicsGroup, vec, Vector} from "excalibur";
import {Resources} from "../resources";
import {getColoredText} from "../utils/Graphics";


export class PunishButton extends Actor {
    constructor(pos : Vector) {
        super({pos, height: 100, width: 100, z: 800});
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);

        const button = Resources.PunishButton.toSprite();
        button.width = this.width;
        button.height = this.height;

        const label = getColoredText("AMENDE !", "ARCADEPI", 12, Color.fromHex('#ffffff'));

        this.on("pointerdown", _ => {
            this.graphics.opacity = 0.5;
        });

        this.on("pointerup", _ => {
            this.graphics.opacity = 1;
        });

        this.on("pointerenter", _ => {
            document.body.style.cursor = "pointer";
        });

        this.on("pointerleave", _ => {
            document.body.style.cursor = "default";
        });



        this.graphics.use(new GraphicsGroup({
            members: [button, {
                graphic: label, offset: vec(12, 45)
            }]
        }));
    }
}