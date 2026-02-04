import {Actor, Engine, vec, Vector} from "excalibur";
import {Resources} from "../resources";
import {randomInt} from "../utils/Random";
import {playSoundTramBell} from "../sound/SoundPlayer";

export class Tram extends Actor {
    private readonly line : TramLine;
    constructor(pos: Vector, direction: boolean, line : TramLine) {
        const directionFactor = direction ? -1 : 1;
        super({
            pos,
            anchor: vec(0, 0),
            height: 40,
            width: 245,
            vel: vec(directionFactor * 45, 0),
            z: 2
        });

        this.line = line;
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);

        const sprite = ()=> {
            switch (this.line) {
                case TramLine.Line1 :
                    return Resources.Tram1.toSprite();
                case TramLine.Line2 :
                    return Resources.Tram2.toSprite();
                case TramLine.Black :
                    return Resources.TramBlack.toSprite();
            }
        };

        let minTimeBell = 2000;
        if (this.vel.x <0) { minTimeBell = 6000 }
        new Promise(async (resolve) => {
            setTimeout(resolve, randomInt(minTimeBell,10000));
        }).then(() => this.bellSound());

        this.graphics.use(sprite());

        this.on('exitviewport', () => this.kill());
    }

    bellSound(): void
    {
        let xFront = this.pos.x;
        if (this.vel.x > 0)
        {
            xFront += this.width;
        }
        playSoundTramBell(xFront, this.line === TramLine.Black);
    }
}

export enum TramLine {
    Line1,
    Line2,
    Black
}