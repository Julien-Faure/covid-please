import {Actor, Color, Engine, GraphicsGroup, Rectangle, vec, Vector} from "excalibur";
import {SCREEN_SIZE} from "../config/Settings";
import {getColoredText} from "../utils/Graphics";


export class GameOver extends Actor {
    private restartCallback: () => void;
    private isShowing = false;

    constructor(pos: Vector) {
        super({
            pos,
            width: SCREEN_SIZE.width,
            height: SCREEN_SIZE.height,
            z: 999,
            anchor: vec(0, 0)
        });

        this.restartCallback = () => {
        };
    }

    override onInitialize(engine: Engine): void {
        super.onInitialize(engine);

        document.addEventListener('keydown', (event) => {
            if(event.key === ' '){
                if(this.isShowing){
                    this.restartCallback();
                }
            }
        });
    }

    public show() {
        this.isShowing = true;

        const overlay = new Rectangle({
            width: SCREEN_SIZE.width,
            height: SCREEN_SIZE.height,
            color: Color.fromHex("#000000") // fill color
        });

        const group = new GraphicsGroup({
            members: [
                {
                    graphic: overlay, offset: vec(0, 0)
                },
                {
                    graphic: getColoredText("Game Over bro..", "ARCADEPI", 20, Color.White),
                    offset: vec(SCREEN_SIZE.width / 2 - 90, SCREEN_SIZE.height / 2 - 100)
                },
                {
                    graphic: getColoredText("Press space to restart", "ARCADEPI", 15, Color.White),
                    offset: vec(SCREEN_SIZE.width / 2 - 100, SCREEN_SIZE.height / 2 + 50)
                }
            ]
        });

        this.graphics.use(group);
    }

    public onRestart(callback: () => void) {
        this.restartCallback = callback;
    }

    public hide() {
        this.isShowing = false;
        this.graphics.hide();
    }
}