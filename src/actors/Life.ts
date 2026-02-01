import {Actor, Engine, GraphicsGroup, vec, Vector} from "excalibur";
import {Resources} from "../resources";


export class Life extends Actor {

    private readonly totalLives = 3;
    private lives = 3;
    private gameOverCallback : () => void;

    constructor(pos: Vector) {
        super({
            pos,
            height: 50, width: 100,
            z: 100
        });

        this.gameOverCallback = () => {};
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        this.drawHearts();
    }

    private drawHearts() {
        this.graphics.hide();

        const fullHeart = Resources.HeartFull.toSprite();
        fullHeart.destSize = {
            width: 30, height: 30
        }

        const emptyHeart = Resources.HeartEmpty.toSprite();
        emptyHeart.destSize = {
            width: 30, height: 30
        }

        const group = new GraphicsGroup({
            members: [
            ],
        });

        for (let i = 0; i < this.lives; i++) {
            group.members.push({graphic: fullHeart, offset: vec(i * 35, 0)});
        }

        for (let i = this.lives; i < this.totalLives; i++) {
            group.members.push({graphic: emptyHeart, offset: vec(i * 35, 0)});
        }

        this.graphics.use(group);
    }

    lostOneLife() {
        switch (this.lives)
        {
            case 3:
                Resources.Wrong1.play(0.7);
                break;
            case 2:
                Resources.Wrong2.play(0.7);
                break;
            case 1:
                Resources.Wrong3.play(0.7);
                break;
        }
        this.lives--;
        this.drawHearts();
        if (this.lives < 1) {
            this.gameOverCallback();
        }
    }

    public onGameOver(callback : () => void) {
        this.gameOverCallback = callback;
    }

    public reset() {
        this.lives = this.totalLives;
        this.drawHearts();
    }
}