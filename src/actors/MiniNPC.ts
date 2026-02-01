import {Actor, Color, Engine, vec, Vector, Animation} from "excalibur";
import {Resources} from "../resources";
import * as ex from "excalibur";

export class MiniNPC extends Actor {

    private readonly initialVel: Vector;

    private idleAnimation: Animation;
    private walkAnimation: Animation;

    constructor(pos: Vector, direction: boolean, speed: number) {
        const directionFactor = direction ? -1 : 1;
        super({
            pos,
            anchor: vec(0, 0),
            width: 64,
            height: 64,
            color: Color.fromHex('#000000'),
            z: 2
        });

        this.initialVel = vec(directionFactor * speed, 0);

        this.idleAnimation = new Animation({frames: []});
        this.walkAnimation = new Animation({frames: []});

        this.prepareIdleAnimation(direction,speed);
        this.prepareWalkAnimation(direction,speed);
    }


    private prepareWalkAnimation(direction : boolean,speed : number) {
        const walkStep = 150 - speed;
        const spriteOptions = {
            flipHorizontal : direction,
            tint: ex.Color.fromHex('#ffffff'),
        };
        this.walkAnimation = new Animation({
            frames: [
                {
                    graphic: Resources.MiniNPCWalk0.toSprite(spriteOptions),
                    duration: walkStep
                },
                {
                    graphic: Resources.MiniNPCWalk1.toSprite(spriteOptions),
                    duration: walkStep
                },
                {
                    graphic: Resources.MiniNPCWalk2.toSprite(spriteOptions),
                    duration: walkStep
                },
                {
                    graphic: Resources.MiniNPCWalk3.toSprite(spriteOptions),
                    duration: walkStep
                },
                {
                    graphic: Resources.MiniNPCWalk4.toSprite(spriteOptions),
                    duration: walkStep
                },
                {
                    graphic: Resources.MiniNPCWalk5.toSprite(spriteOptions),
                    duration: walkStep
                },
                {
                    graphic: Resources.MiniNPCWalk6.toSprite(spriteOptions),
                    duration: walkStep
                },
                {
                    graphic: Resources.MiniNPCWalk7.toSprite(spriteOptions),
                    duration: walkStep
                }

            ]
        });
    }

    private prepareIdleAnimation(direction : boolean, speed : number) {
        const idleStep = 700 - speed;
        const spriteOptions = {
            flipHorizontal : direction
        };
        this.idleAnimation = new Animation({
            frames: [
                {
                    graphic: Resources.MiniNPCIdle0.toSprite(spriteOptions),
                    duration: idleStep
                },
                {
                    graphic: Resources.MiniNPCIdle1.toSprite(spriteOptions),
                    duration: idleStep
                }
            ]
        });
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        this.walk();

        this.on('exitviewport', () => this.kill());
    }

    public walk() {
        this.vel = this.initialVel;
        this.graphics.use(this.walkAnimation);
    }

    public stop() {
        this.vel.x = 0;
        this.graphics.use(this.idleAnimation);
    }

}