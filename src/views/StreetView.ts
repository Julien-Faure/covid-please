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
import {TramFactory} from "../actors/TramFactory";

const NPC_SPAWN_INTERVAL_MS = 5000;
const TRAM_SPAWN_INTERVAL_MS = 20000;
const VIEW_WIDTH = SCREEN_SIZE.width;
const VIEW_HEIGHT = 233;
const LIMITE_TO_BE_FOREGROUND = 220;


export class StreetView implements View {
    private readonly npcTimer: Timer;
    private readonly tramTimer: Timer;
    private readonly miniNPCFactory: MiniNPCFactory;
    private readonly tramFactory: TramFactory;
    private readonly level: Level;
    private actors: MiniNPC[] = [];

    private onNPCClickedCallback : (npc : MiniNPC) => void = () => {};

    constructor(level : Level) {
        this.npcTimer = new Timer({
            interval: NPC_SPAWN_INTERVAL_MS,
            repeats: true,
            action: () => this.spawnOneNPC()
        });

        this.tramTimer = new Timer({
            interval: TRAM_SPAWN_INTERVAL_MS,
            repeats: true,
            action: () => this.spawnOneTram()
        });

        this.miniNPCFactory = new MiniNPCFactory({
            xMax: VIEW_WIDTH,
            xMin: 0,
            yMax: VIEW_HEIGHT - 55,
            yMin: 2 * (VIEW_HEIGHT / 3)
        });

        this.tramFactory = new TramFactory({
            xMax: VIEW_WIDTH,
            xMin: 0,
            y: VIEW_HEIGHT - 75,
        });

        this.level = level;
    }

    // *****************************************************************************************************************

    public init(): void {
        const level = this.level;
        level.add(new StreetBackground(new Vector(0,0)));
        level.add(new StreetForeground(new Vector(0,0)));
        level.add(new StreetFountain(new Vector(0,0)));
        level.add(this.npcTimer);
        level.add(this.tramTimer);

        this.npcTimer.start();
        this.tramTimer.start();
        this.spawnOneNPC();
        this.spawnOneTram();
    }

    public dispose(): void {
        this.npcTimer.stop();
        this.tramTimer.stop();
    }

    getDimensions(): { width: number; height: number } {
        return {height: VIEW_HEIGHT, width: VIEW_WIDTH};
    }

    getPosition(): Vector {
        return new Vector(0,0);
    }



    // -----------------------------------------------------------------------------------------------------------------

    private spawnOneNPC(): void {
        const nb = randomInt(1,5);
        for (let i = 0; i <nb; i++) {
            const actor = this.miniNPCFactory.create();
            if (actor.pos.y > LIMITE_TO_BE_FOREGROUND - 55) {
                actor.z = 6;
            } else {
                actor.z = 4;
            }
            this.level.add(actor);
            actor.on("pointerdown", () => this.callOnNPCClicked(actor));
            this.actors.push(actor);
            actor.onPostKill = (_) => {
                this.actors = this.actors.filter(a => a !== actor);
            };
        }
    }

    private spawnOneTram(): void {
        const tram = this.tramFactory.create();
        this.level.add(tram);
    }

    private callOnNPCClicked(npc : MiniNPC) {
        this.onNPCClickedCallback(npc);
    }

    public onNPCClicked(func : (npc : MiniNPC) => void) {
        this.onNPCClickedCallback = func;
    }

    public clearStreet() {
        this.actors.forEach(a => this.level.remove(a));
        this.actors = [];
    }
}