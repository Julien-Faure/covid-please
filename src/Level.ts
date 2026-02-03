import {Color, Engine, Scene, vec} from "excalibur";
import {StreetView} from "./views/StreetView";
import {DeskView} from "./views/DeskView";
import {ContextGeneratorBasicImpl} from "./services/ContextGeneratorBasicImpl";
import {MiniNPC} from "./actors/MiniNPC";
import {ContextMasterDisruptor} from "./services/ContextMasterDisruptor";
import {Life} from "./actors/Life";
import {FinalContext} from "./data/FinalContext";
import {GameOver} from "./actors/GameOver";
import {Resources} from "./resources";
import {randomInt} from "./utils/Random";
import {playSound2D} from "./sound/SoundPlayer"


export class Level extends Scene {
    private lastMiniNPC: MiniNPC | null = null;
    private npcControlled : MiniNPC[] = [];
    private lastFinalContext : FinalContext | null = null;
    private gameOver: GameOver = new GameOver(vec(0, 0));
    private lastDateOfControl : Date = new Date();
    private readonly streetView : StreetView;
    private readonly deskView : DeskView;

    constructor() {
        super();
        this.streetView = new StreetView(this);
        this.deskView = new DeskView(this);
    }


    override onInitialize(engine: Engine): void {
        Resources.AmbianceLoop.loop = true;
        Resources.AmbianceLoop.play();
        new Promise(async (resolve) => {
            setTimeout(resolve, randomInt(5000,45000));
        }).then(() => Resources.Party.play());

        const ctxGenerator = new ContextGeneratorBasicImpl();

        const life = new Life(vec(60, 25));
        life.onGameOver(() => this.showGameOver());
        this.add(life);

        const streetView = this.streetView;
        streetView.init();
        streetView.onNPCClicked(npc => {
            if (!this.wasControlled(npc) && new Date().getTime() - this.lastDateOfControl.getTime() > 500) {
                playSound2D(Resources.PeopleStop,0.8,0.2,0.2);
                if (this.lastMiniNPC !== null) {
                    // RELEASE
                    if(this.lastFinalContext!.punishable.length > 0){
                        this.lastFinalContext!.punishable.forEach((d)=> {
                            deskView.popWarning(d);
                        });

                        life.lostOneLife();
                    }
                    this.lastMiniNPC.color = Color.fromHex('#42ff78');
                    this.lastMiniNPC.walk();
                    this.lastMiniNPC.graphics.opacity = 0.5;
                }

                this.lastDateOfControl = new Date();
                this.lastMiniNPC = npc;
                const context = ctxGenerator.generate();

                const disruptor = new ContextMasterDisruptor();
                const finalContext = disruptor.disturb(context);

                deskView.setContext(finalContext.context);
                this.lastFinalContext = finalContext;

                npc.stop();
                this.npcControlled.push(npc);
            }
        });

        const deskView = this.deskView;

        deskView.onPunishClicked(() => {
            if (this.lastMiniNPC !== null) {
                // PUNISHING

                this.lastMiniNPC.graphics.opacity = 0.5;
                this.lastMiniNPC.walk();
                deskView.clearDesk();
                if(this.lastFinalContext!.punishable.length === 0){
                    this.deskView.popWarning({
                        origin: "Amende",
                        description: "Vous avez mis une amende à quelqu'un en règle.",
                        punishable: true
                    })
                    life.lostOneLife();
                }else {
                    playSound2D(Resources.Ammende);
                    streetView.incrementCounter();
                }
                this.lastMiniNPC = null;
            }
        });

        deskView.init();

        this.gameOver = new GameOver(vec(0, 0));
        this.gameOver.onInitialize(engine);
        this.add(this.gameOver);
        this.gameOver.onRestart(() => {
            this.gameOver.hide();
            life.reset();
            this.npcControlled = [];
            this.lastMiniNPC = null;
            this.lastFinalContext = null;
            deskView.clearDesk();
            deskView.clearWarnings();
            streetView.clearStreet();
            streetView.resetCounter();
            Resources.AmbianceLoop.play();
            new Promise(async (resolve) => {
                setTimeout(resolve, randomInt(5000,45000));
            }).then(() => Resources.Party.play(0.3));
        });
    }


    private wasControlled(npc : MiniNPC) : boolean {
        return this.npcControlled.includes(npc);
    }

    private showGameOver() {
        console.log("GAME OVER")
        Resources.AmbianceLoop.pause();
        Resources.Party.pause();
        this.gameOver.setScore(this.streetView.getCount());
        this.gameOver.show();
    }
}