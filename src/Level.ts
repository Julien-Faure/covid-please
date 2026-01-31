import {Color, Engine, Scene} from "excalibur";
import {StreetView} from "./views/StreetView";
import {PreviewView} from "./views/PreviewView";
import {DeskView} from "./views/DeskView";
import {ContextGeneratorBasicImpl} from "./services/ContextGeneratorBasicImpl";
import {MiniNPC} from "./actors/MiniNPC";
import {ContextMasterDisruptor} from "./services/ContextMasterDisruptor";



export class Level extends Scene {
    private lastMiniNPC: MiniNPC | null = null;
    private npcControlled : MiniNPC[] = [];


    override onInitialize(engine: Engine): void {
        const ctxGenerator = new ContextGeneratorBasicImpl();

        const streetView = new StreetView(this);
        streetView.init();
        streetView.onNPCClicked(npc => {
            if (!this.wasControlled(npc)) {
                if (this.lastMiniNPC !== null) {
                    // TODO : Release logic
                    this.lastMiniNPC.color = Color.fromHex('#42ff78');
                    this.lastMiniNPC.walk();
                }

                this.lastMiniNPC = npc;
                const context = ctxGenerator.generate();

                const disruptor = new ContextMasterDisruptor();
                const finalContext = disruptor.disturb(context);

                deskView.setContext(finalContext.context);

                npc.stop();
                this.npcControlled.push(npc);
            }
        });


        const previewView = new PreviewView(this);
        previewView.onPunishClicked(() => {
            if (this.lastMiniNPC !== null) {

                this.lastMiniNPC.color = Color.fromHex('#ff0000');
                this.lastMiniNPC.walk();
                deskView.clearDesk();
                // TODO : Punishing logic

                this.lastMiniNPC = null;
                console.log("PUNISHED !!");
            }
        });
        previewView.init();

        const deskView = new DeskView(this);
        deskView.init();
    }


    private wasControlled(npc : MiniNPC) : boolean {
        return this.npcControlled.includes(npc);
    }
}