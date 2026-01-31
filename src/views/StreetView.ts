import {View} from "./View";
import {Level} from "../Level";
import {StreetBackground} from "../background/StreetBackground";
import {MiniNPCFactory} from "../actors/MiniNPCFactory";
import {SCREEN_SIZE} from "../config/Settings";
import {randomInt} from "../utils/Random";
import {MiniNPC} from "../actors/MiniNPC";
import {Timer, Vector} from "excalibur";
import {StreetForeground} from "../background/StreetForeground";
import {StreetFountain} from "../background/StreetFountain";

const SPAWN_INTERVAL_MS = 5000;
const VIEW_WIDTH = SCREEN_SIZE.width;
const VIEW_HEIGHT = 233;
const LIMITE_TO_BE_FOREGROUND = 220;


export class StreetView implements View {
    private readonly timer: Timer;
    private readonly miniNPCFactory: MiniNPCFactory;
    private readonly level: Level;

    private onNPCClickedCallback : (npc : MiniNPC) => void = () => {};

    constructor(level : Level) {
        this.timer = new Timer({
            interval: SPAWN_INTERVAL_MS,
            repeats: true,
            action: () => this.spawnOne()
        });

        this.miniNPCFactory = new MiniNPCFactory({
            xMax: VIEW_WIDTH,
            xMin: 0,
            yMax: VIEW_HEIGHT - 55,
            yMin: 2 * (VIEW_HEIGHT / 3)
        });

        this.level = level;
    }

    // *****************************************************************************************************************

    public init(): void {
        const level = this.level;
        level.add(new StreetBackground(new Vector(0,0)));
        level.add(new StreetForeground(new Vector(0,0)));
        level.add(new StreetFountain(new Vector(0,0)));
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
            const actor = this.miniNPCFactory.create();
            if (actor.pos.y > LIMITE_TO_BE_FOREGROUND - 55) {
                actor.z = 5;
            } else {
                actor.z = 3;
            }
            this.level.add(actor);
            actor.on("pointerdown", () => this.callOnNPCClicked(actor));
        }
    }

    private callOnNPCClicked(npc : MiniNPC) {
        this.onNPCClickedCallback(npc);
    }

    public onNPCClicked(func : (npc : MiniNPC) => void) {
        this.onNPCClickedCallback = func;
    }

}