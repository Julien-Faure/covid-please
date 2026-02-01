import {Actor, Color, Engine, GraphicsGroup, vec, Vector} from "excalibur";
import {Resources} from "../resources";
import {getColoredText} from "../utils/Graphics";


export class Counter extends Actor {
    private count = 0;

    constructor(pos: Vector) {
        super({
            pos,
            z: 9999,
            anchor: vec(0, 0),
            height: 30,
            width: 100
        });

        this.count = 0;
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        this.drawCount();
    }

    private drawCount() {
        this.graphics.hide();

        const buttonLogo = Resources.PunishButton.toSprite();
        buttonLogo.destSize = {width: 30, height: 30};

        const group = new GraphicsGroup({
            members: [
                {
                    graphic: buttonLogo, offset: vec(0, 0)
                },
                {
                    graphic: getColoredText(`${this.count}`, "ARCADEPI", 20, Color.fromHex("#000000")),
                    offset: vec(35, 6)
                }
            ]
        });

        this.graphics.use(group);
    }

    public increase() {
        this.count++;
        this.drawCount();
    }

    public reset(){
        this.count = 0;
        this.drawCount();
    }

    public getCount() {
        return this.count;
    }
}