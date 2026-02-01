import {View} from "./View";
import {Level} from "../Level";
import {StreetBackground} from "../background/StreetBackground";
import {MiniNPCFactory} from "../actors/MiniNPCFactory";
import {SCREEN_SIZE} from "../config/Settings";
import {MiniNPC} from "../actors/MiniNPC";
import {Timer, vec, Vector} from "excalibur";
import {StreetForeground} from "../background/StreetForeground";
import {StreetFountain} from "../background/StreetFountain";
import {TramFactory} from "../actors/TramFactory";
import {StreetOverlay} from "../background/StreetOverlay";
import {Counter} from "../actors/Counter";

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
    private readonly counter: Counter;

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
            yMax: VIEW_HEIGHT - 70,
            yMin: 2 * (VIEW_HEIGHT / 3) - 15
        });

        this.tramFactory = new TramFactory({
            xMax: VIEW_WIDTH,
            xMin: 0,
            y: VIEW_HEIGHT - 80,
        }, [50, 40, 10]);

        this.counter = new Counter(vec(VIEW_WIDTH - 100, 7));

        this.level = level;
    }

    // *****************************************************************************************************************

    public init(): void {
        const level = this.level;
        level.add(new StreetBackground(new Vector(0,0)));
        level.add(new StreetForeground(new Vector(0,0)));
        level.add(new StreetFountain(new Vector(0,0)));
        level.add(new StreetOverlay(new Vector(0,0)));
        level.add(this.npcTimer);
        level.add(this.tramTimer);
        this.level.add(this.counter);

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
        const actor = this.miniNPCFactory.create();
        if (actor.pos.y > LIMITE_TO_BE_FOREGROUND - 65) {
            actor.z = 7;
        } else {
            actor.z = 5;
        }
        this.level.add(actor);
        actor.on("pointerdown", () => this.callOnNPCClicked(actor));
        this.actors.push(actor);
        actor.onPostKill = (_) => {
            this.actors = this.actors.filter(a => a !== actor);
        };
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

    public resetCounter() {
        this.counter.reset();
    }

    public incrementCounter() {
        this.counter.increase();
    }

    public getCount(): number{
        return this.counter.getCount();
    }

}