import {Actor, Color, Engine, vec, Vector} from "excalibur";

export class MiniNPC extends Actor {

    private readonly initialVel: Vector;

    constructor(pos: Vector, direction: boolean, speed: number) {
        const directionFactor = direction ? -1 : 1;
        super({
            pos,
            anchor: vec(0, 0),
            width: 15,
            height: 50,
            color: Color.fromHex('#4500f3'),
            z: 2
        });

        this.initialVel = vec(directionFactor * speed, 0);
    }


    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        this.walk();

        this.on('exitviewport', () => this.kill());
    }

    public walk() {
        this.vel = this.initialVel;
    }

    public stop() {
        this.vel.x = 0;
    }

}