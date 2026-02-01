import {randomBoolean, randomInt} from "../utils/Random";
import * as ex from "excalibur";
import {Tram} from "./Tram";


export class TramFactory {
    private readonly xMax: number;
    private readonly xMin: number;
    private readonly y: number;

    constructor({xMax, xMin, y}: { xMax: number, xMin: number, y: number }) {
        this.xMax = xMax;
        this.xMin = xMin;
        this.y = y;
    }

    create(): Tram {
        const direction = randomBoolean();
        const y = this.y
        let pos;

        if (direction) {
            pos = new ex.Vector(this.xMax, y);
        } else {
            pos = new ex.Vector(this.xMin, y);
        }

        return new Tram(pos, direction);
    }

}