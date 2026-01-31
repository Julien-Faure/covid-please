import * as ex from "excalibur";
import {Actor, vec, Vector} from "excalibur";
import {View} from "./View";
import {Level} from "../Level";
import {DeskBackground} from "../background/DeskBackground";
import {IDCard} from "../actors/IDCard";
import {Draggable} from "../utils/Draggable";
import {Attestation} from "../actors/Attestation";
import {Context} from "../data/Context";
import {WorkCert} from "../actors/WorkCert";
import {AttestationReason} from "../dto/AttestationDto";

const VIEW_WIDTH = 1014;
const VIEW_HEIGHT = 487;

const POSITION_X = 266;
const POSITION_Y = 233;

export class DeskView implements View {
    private readonly level: Level;
    private draggables: Draggable[] = [];
    private clearableActors: Actor[] = [];

    constructor(level: Level) {
        this.level = level;
    }

    init(): void {
        let background = new DeskBackground(new ex.Vector(POSITION_X, POSITION_Y));

        this.level.add(background)

        background.on("pointerleave", () => {
            this.draggables.forEach(value => value.stopDragging());
            document.body.style.cursor = "default";
        });
    }

    private enableDraggable(actor: Actor) {
        this.draggables.push(new Draggable(actor, this, {
            bringToFront: true,
            clampToScreen: true
        }));
    }

    dispose(): void {
        this.draggables.forEach(d => d.detach());
        this.draggables = [];
    }

    getDimensions(): { width: number; height: number } {
        return {
            width: VIEW_WIDTH,
            height: VIEW_HEIGHT
        };
    }

    getPosition(): Vector {
        return new Vector(POSITION_X, POSITION_Y);
    }

    public setContext(ctx: Context): void {
        this.clearDesk();
        let emptyIDCard = new IDCard(new ex.Vector(POSITION_X + 12, POSITION_Y + 12), ctx.idCard);
        const attestation = new Attestation(new ex.Vector(POSITION_X + (300), POSITION_Y + (50)), ctx.attestation);
        const workCert = new WorkCert(vec(POSITION_X + 200, POSITION_Y + 10), ctx.workCert);

        this.level.add(attestation)
        this.enableDraggable(attestation);

        this.level.add(emptyIDCard)
        this.enableDraggable(emptyIDCard);

        if(ctx.attestation.reasons.includes(AttestationReason.WORK)){
            this.level.add(workCert);
            this.enableDraggable(workCert);
        }

        this.clearableActors.push(emptyIDCard);
        this.clearableActors.push(attestation);
        this.clearableActors.push(workCert);
    }

    public clearDesk() {
        this.draggables.forEach(d => d.stopDragging());
        this.draggables = [];
        this.clearableActors.forEach(a => this.level.remove(a));
        this.clearableActors = [];
    }


}