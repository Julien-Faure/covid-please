import {randomBoolean, randomInt} from "../utils/Random";
import * as ex from "excalibur";
import {Tram, TramLine} from "./Tram";


export class TramFactory {
    private readonly xMax: number;
    private readonly xMin: number;
    private readonly y: number;
    private chance: number[];

    constructor({xMax, xMin, y}: { xMax: number, xMin: number, y: number }, chance: number[]) {
        this.xMax = xMax;
        this.xMin = xMin;
        this.y = y;

        if (chance.length !== 3) {
            throw new Error("Chance must be an array of 3 elements");
        }
        this.chance = chance;
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

        const total = this.chance.reduce((acc, val) => acc + val);
        const random = randomInt(0, total );

        if (random < this.chance[0]) {
            return new Tram(pos, direction, TramLine.Line1);
        } else if (random < this.chance[0] + this.chance[1]) {
            return new Tram(pos, direction, TramLine.Line2);
        } else {
            return new Tram(pos, direction, TramLine.Black);
        }
    }

}