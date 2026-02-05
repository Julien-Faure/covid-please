import * as ex from "excalibur";
import {Engine} from "excalibur";
import {randomInt, randomNewInt} from "../utils/Random";
import {playSoundParty,stopSoundParty} from "../sound/SoundPlayer";


export class PartyManager extends ex.Actor {
    private gameOn: boolean = false;

    private readonly partyXPositions: number[] = [150,250,370,530,1030];

    private readonly colors: string[] = ["ff2222","22ff22","2222ff"];
    private currentColor = 0;
    private readonly animationTime: number = 500;
    private animationTimer: number = 500;

    private partyOn: boolean = false;
    private readonly timeBetweenPartyMin: number = 5000;
    private readonly timeBetweenPartyMax: number = 15000;
    private timetoNextParty: number = 10000;

    private readonly partyMinTime: number = 10000;
    private readonly partyMaxTime: number = 30000;
    private partyTimer: number = 0;

    constructor() {
        super({
            pos: ex.vec(0,40),
            anchor: ex.vec(0, 0),
            z: 0,
            height: 100,
            width: 150,
            color: ex.Color.fromHex("ff0022"),
        });
    }

    public onInitialize(engine: Engine) {
        super.onInitialize(engine);
        this.start();
    }

    public start(): void
    {
        this.partyStop();
        this.gameOn = true;
    }

    public stop(): void
    {
        this.partyStop();
        this.gameOn = false;
    }

    public onPostUpdate(engine: Engine, elapsed: number) {
        if (this.gameOn) {
            if (this.partyOn) {
                this.animationTimer -= elapsed;
                this.partyTimer -= elapsed;
                if (this.partyTimer < 0) {
                    this.partyStop();
                } else if (this.animationTimer < 0) {
                    this.animationTimer = this.animationTime;
                    this.currentColor = randomNewInt(0, this.colors.length - 1,this.currentColor);
                    this.color = ex.Color.fromHex(this.colors[this.currentColor]);
                }
            } else {
                this.timetoNextParty -= elapsed;
                if (this.timetoNextParty < 0) {
                    this.partyStart();
                }
            }
        }
    }

    private partyStart():void
    {
        this.partyOn = true;
        this.partyTimer = randomInt(this.partyMinTime,this.partyMaxTime);
        this.color = ex.Color.fromHex(this.colors[randomInt(0,this.colors.length -1)]);
        this.animationTimer = this.animationTime;
        this.pos.x = this.partyXPositions[randomInt(0,this.partyXPositions.length-1)];
        playSoundParty(this.pos.x + (this.width/2));
    }

    private partyStop(): void
    {
        this.partyOn = false;
        this.timetoNextParty = randomInt(this.timeBetweenPartyMin, this.timeBetweenPartyMax);
        this.pos.x = 0;
        stopSoundParty();
    }

}