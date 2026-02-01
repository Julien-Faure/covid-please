import {Actor, Engine, vec, Vector} from "excalibur";
import {Resources} from "../resources";


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
                case TramLine.Line4 :
                    return Resources.Tram4.toSprite();
            }
        };

        this.graphics.use(sprite());

        this.on('exitviewport', () => this.kill());
    }
}

export enum TramLine {
    Line1,
    Line2,
    Line4
}