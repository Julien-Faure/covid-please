import {Color, Engine, Scene, vec} from "excalibur";
import {StreetView} from "./views/StreetView";
import {DeskView} from "./views/DeskView";
import {ContextGeneratorBasicImpl} from "./services/ContextGeneratorBasicImpl";
import {MiniNPC} from "./actors/MiniNPC";
import {ContextMasterDisruptor} from "./services/ContextMasterDisruptor";
import {Life} from "./actors/Life";
import {FinalContext} from "./data/FinalContext";
import {GameOver} from "./actors/GameOver";



export class Level extends Scene {
    private lastMiniNPC: MiniNPC | null = null;
    private npcControlled : MiniNPC[] = [];
    private lastFinalContext : FinalContext | null = null;
    private gameOver: GameOver = new GameOver(vec(0, 0));


    override onInitialize(engine: Engine): void {
        const ctxGenerator = new ContextGeneratorBasicImpl();

        const life = new Life(vec(60, 25));
        life.onGameOver(() => this.showGameOver());
        this.add(life);

        const streetView = new StreetView(this);
        streetView.init();
        streetView.onNPCClicked(npc => {
            if (!this.wasControlled(npc)) {
                if (this.lastMiniNPC !== null) {
                    // RELEASE
                    if(this.lastFinalContext?.punishable){
                        life.lostOneLife();
                    }
                    this.lastMiniNPC.color = Color.fromHex('#42ff78');
                    this.lastMiniNPC.walk();
                }

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




        const deskView = new DeskView(this);

        deskView.onPunishClicked(() => {
            console.log("sddd")
            if (this.lastMiniNPC !== null) {
                console.log("aaaa")
                // PUNISHING

                this.lastMiniNPC.color = Color.fromHex('#ff0000');
                this.lastMiniNPC.walk();
                deskView.clearDesk();
                if(!this.lastFinalContext?.punishable){
                    life.lostOneLife();
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
            streetView.clearStreet();
        });
    }


    private wasControlled(npc : MiniNPC) : boolean {
        return this.npcControlled.includes(npc);
    }

    private showGameOver() {
        console.log("GAME OVER")
        this.gameOver.show();
    }
}