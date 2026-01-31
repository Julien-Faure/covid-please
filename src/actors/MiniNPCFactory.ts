import * as ex from "excalibur";
import {MiniNPC} from "./MiniNPC";
import {randomBoolean, randomInt} from "../utils/Random";

export class MiniNPCFactory {

    private readonly xMax : number;
    private readonly xMin : number;
    private readonly yMax : number;
    private readonly yMin : number;

    constructor({xMax, xMin, yMax, yMin} : {xMax : number, xMin : number, yMax : number, yMin : number}) {
        this.xMax = xMax;
        this.xMin = xMin;
        this.yMax = yMax;
        this.yMin = yMin;
    }

    create() : MiniNPC {
        const direction = randomBoolean();
        const speed = randomInt(50,70);
        const y = randomInt(this.yMin, this.yMax);
        let pos;

        if (direction) {
            pos = new ex.Vector(this.xMax, y);
        }else {
            pos = new ex.Vector(this.xMin, y);
        }

        return new MiniNPC(pos, direction, speed);
    }

}

