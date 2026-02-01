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
import {PunishButton} from "../actors/PunishButton";
import {SCREEN_SIZE} from "../config/Settings";
import {Convocation} from "../actors/Convocation";
import {Ticket} from "../actors/Ticket";
import {StudentCard} from "../actors/StudentCard";

const VIEW_WIDTH = SCREEN_SIZE.width;
const VIEW_HEIGHT = 487;

const POSITION_X = 0;
const POSITION_Y = 233;

export class DeskView implements View {
    private readonly level: Level;
    private draggables: Draggable[] = [];
    private clearableActors: Actor[] = [];

    private punishCallback : () => void = () => {};

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

        const punishButton = new PunishButton(vec(POSITION_X + VIEW_WIDTH - 50, POSITION_Y + VIEW_HEIGHT - 50));
        this.level.add(punishButton)
        punishButton.on('pointerdown', this.punishCallback);
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
        const convocation = new Convocation(vec(POSITION_X + 150, POSITION_Y + 20), ctx.convocation);
        const ticket = new Ticket(vec(POSITION_X + 300, POSITION_Y + 52), ctx.ticket);
        const studentCard = new StudentCard(vec(POSITION_X + 200, POSITION_Y + 50), ctx.student);

        this.level.add(attestation)
        this.enableDraggable(attestation);

        this.level.add(emptyIDCard)
        this.enableDraggable(emptyIDCard);

        if(ctx.attestation.reasons.includes(AttestationReason.WORK)){
            this.level.add(workCert);
            this.enableDraggable(workCert);
            this.clearableActors.push(workCert);
        }

        if(ctx.attestation.reasons.includes(AttestationReason.JUSTICE)) {
            this.level.add(convocation);
            this.enableDraggable(convocation);
            this.clearableActors.push(convocation);
        }

        if(ctx.attestation.reasons.includes(AttestationReason.MARKET)){
            this.level.add(ticket);
            this.enableDraggable(ticket);
            this.clearableActors.push(ticket);
        }

        if (ctx.attestation.reasons.includes(AttestationReason.STUDY)) {
            this.level.add(studentCard);
            this.enableDraggable(studentCard);
            this.clearableActors.push(studentCard);
        }

        this.clearableActors.push(emptyIDCard);
        this.clearableActors.push(attestation);
    }

    public clearDesk() {
        this.draggables.forEach(d => d.stopDragging());
        this.draggables = [];
        this.clearableActors.forEach(a => this.level.remove(a));
        this.clearableActors = [];
    }

    public onPunishClicked(callback : () => void) {
        this.punishCallback = callback;
    }


}