import {DefaultLoader, Engine, ExcaliburGraphicsContext, Scene, SceneActivationContext} from "excalibur";
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
                    this.lastMiniNPC.kill();
                }

                this.lastMiniNPC = npc;
                const context = ctxGenerator.generate();

                const disruptor = new ContextMasterDisruptor();
                const finalContext = disruptor.disturb(context);

                deskView.setContext(finalContext.context);

                if (context.punishable) {
                    console.log("zfnjoqhjfzil!qzjm")
                }

                npc.stop();
                this.npcControlled.push(npc);
            }
        });


        new PreviewView(this).init();
        const deskView = new DeskView(this);
        deskView.init();
    }


    private wasControlled(npc : MiniNPC) : boolean {
        return this.npcControlled.includes(npc);
    }

    override onPreLoad(loader: DefaultLoader): void {
        // Add any scene specific resources to load
    }

    override onActivate(context: SceneActivationContext<unknown>): void {
        // Called when Excalibur transitions to this scene
        // Only 1 scene is active at a time
    }

    override onDeactivate(context: SceneActivationContext): void {
        // Called when Excalibur transitions away from this scene
        // Only 1 scene is active at a time
    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
        // Called before anything updates in the scene
    }

    override onPostUpdate(engine: Engine, elapsedMs: number): void {
        // Called after everything updates in the scene
    }

    override onPreDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
        // Called before Excalibur draws to the screen
    }

    override onPostDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
        // Called after Excalibur draws to the screen
    }


}