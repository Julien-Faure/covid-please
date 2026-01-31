import * as ex from "excalibur";
import {View} from "./View";
import {Level} from "../Level";
import {StreetBackground} from "../background/StreetBackground";
import {MiniNPCFactory} from "../actors/MiniNPCFactory";
import {SCREEN_SIZE} from "../config/Settings";
import {randomInt} from "../utils/Random";
import {Vector} from "excalibur";

const SPAWN_INTERVAL_MS = 5000;
const VIEW_WIDTH = SCREEN_SIZE.width;
const VIEW_HEIGHT = 233;


export class StreetView implements View {
    private readonly timer: ex.Timer;
    private readonly miniNPCFactory: MiniNPCFactory;
    private readonly level: Level;


    constructor(level : Level) {
        this.timer = new ex.Timer({
            interval: SPAWN_INTERVAL_MS,
            repeats: true,
            action: () => this.spawnOne()
        });

        this.miniNPCFactory = new MiniNPCFactory({
            xMax: VIEW_WIDTH,
            xMin: 0,
            yMax: VIEW_HEIGHT,
            yMin: 0
        });

        this.level = level;
    }

    // *****************************************************************************************************************

    public init(): void {
        const level = this.level;
        level.add(new StreetBackground(new ex.Vector(0,0)));
        level.add(this.timer);

        this.timer.start();
    }

    public dispose(): void {
        this.timer.stop();
    }

    getDimensions(): { width: number; height: number } {
        return {height: VIEW_HEIGHT, width: VIEW_WIDTH};
    }

    getPosition(): Vector {
        return new Vector(0,0);
    }



    // -----------------------------------------------------------------------------------------------------------------

    private spawnOne(): void {
        const nb = randomInt(1,5);
        for (let i = 0; i <nb; i++) {
            this.level.add(this.miniNPCFactory.create());
        }
    }

}