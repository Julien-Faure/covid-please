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
import {Sport} from "../actors/Sport";
import {Doc} from "../actors/Doc";
import {Warning} from "../actors/Warning";
import {DisruptionDescription} from "../data/DisruptionDescription";
import {randomInt} from "../utils/Random";

const VIEW_WIDTH = SCREEN_SIZE.width;
const VIEW_HEIGHT = 487;

const POSITION_X = 0;
const POSITION_Y = 233;

export class DeskView implements View {
    private readonly level: Level;
    private draggables: Draggable[] = [];
    private clearableActors: Actor[] = [];
    private clearableWarnings: Warning[] = [];

    private punishCallback: () => void = () => {
    };

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

        const punishButton = new PunishButton(vec(POSITION_X + VIEW_WIDTH - 60, POSITION_Y + VIEW_HEIGHT - 60));
        this.level.add(punishButton)
        punishButton.on('pointerdown', this.punishCallback);
    }

    private enableDraggable(actor: Actor) {
        this.draggables.push(new Draggable(actor, this, {
            bringToFront: true,
            clampToScreen: true
        }));
    }

    public popWarning(error: DisruptionDescription){
        const x = POSITION_X;
        const y = POSITION_Y;

        const warning = new Warning(vec(x, y), {
            error
        });

        this.setRandomPosition(warning);
        this.level.add(warning);
        this.enableDraggable(warning);
        this.clearableWarnings.push(warning);
    }

    public update(mouseScreenPosition: Vector)
    {
        for(let i:number = 0; i < this.draggables.length;i++ )
        {
            this.draggables[i].updatePosition(mouseScreenPosition);
        }
    }

    dispose(): void {
        this.draggables.forEach(d => d.detach());
        this.draggables = [];
        this.clearableWarnings.forEach(w => this.level.remove(w));
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

    private setRandomPosition(actor: Actor) {
        actor.pos.x = POSITION_X + randomInt(0, VIEW_WIDTH - actor.width);
        actor.pos.y = POSITION_Y + randomInt(0, VIEW_HEIGHT - actor.height);
    }

    public setContext(ctx: Context): void {
        this.clearDesk();

        const randomGive = randomInt(0, 100);

        const idCard = new IDCard(new ex.Vector(POSITION_X + 12, POSITION_Y + 12), ctx.idCard);
        const attestation = new Attestation(new ex.Vector(POSITION_X + (300), POSITION_Y + (50)), ctx.attestation);
        const workCert = new WorkCert(vec(POSITION_X + 200, POSITION_Y + 10), ctx.workCert);
        const convocation = new Convocation(vec(POSITION_X + 150, POSITION_Y + 20), ctx.convocation);
        const ticket = new Ticket(vec(POSITION_X + 300, POSITION_Y + 52), ctx.ticket);
        const studentCard = new StudentCard(vec(POSITION_X + 200, POSITION_Y + 50), ctx.student);
        const sport = new Sport(vec(POSITION_X + 10, POSITION_Y + 10), ctx.sport);
        const doc = new Doc(vec(POSITION_X + 450, POSITION_Y + 25), ctx.doc);

        this.setRandomPosition(idCard);
        this.setRandomPosition(attestation);
        this.setRandomPosition(workCert);
        this.setRandomPosition(convocation);
        this.setRandomPosition(ticket);
        this.setRandomPosition(studentCard);
        this.setRandomPosition(sport);
        this.setRandomPosition(doc);

        this.level.add(attestation)
        this.enableDraggable(attestation);

        this.level.add(idCard)
        this.enableDraggable(idCard);

        const reason = [ctx.realReason];

        if (reason.includes(AttestationReason.WORK) || randomInt(0, 100) == randomGive) {
            this.level.add(workCert);
            this.enableDraggable(workCert);
            this.clearableActors.push(workCert);
        }

        if (reason.includes(AttestationReason.JUSTICE) || randomInt(0, 100) == randomGive) {
            this.level.add(convocation);
            this.enableDraggable(convocation);
            this.clearableActors.push(convocation);
        }

        if (reason.includes(AttestationReason.MARKET) || randomInt(0, 100) == randomGive) {
            this.level.add(ticket);
            this.enableDraggable(ticket);
            this.clearableActors.push(ticket);
        }

        if (reason.includes(AttestationReason.STUDY) || randomInt(0, 100) == randomGive) {
            this.level.add(studentCard);
            this.enableDraggable(studentCard);
            this.clearableActors.push(studentCard);
        }

        if (reason.includes(AttestationReason.SPORT) || randomInt(0, 100) == randomGive) {
            this.level.add(sport);
            this.enableDraggable(sport);
            this.clearableActors.push(sport);
        }

        if (reason.includes(AttestationReason.HEALTH) || randomInt(0, 100) == randomGive) {
            this.level.add(doc);
            this.enableDraggable(doc);
            this.clearableActors.push(doc);
        }

        this.clearableActors.push(idCard);
        this.clearableActors.push(attestation);
    }

    public clearDesk() {
        this.draggables.forEach(d => d.stopDragging());
        this.draggables = [];
        for(let i: number = 0; i < this.clearableWarnings.length; i++)
        {
            this.enableDraggable(this.clearableWarnings[i]);
        }
        this.clearableActors.forEach(a => this.level.remove(a));
        this.clearableActors = [];
    }

    public clearWarnings() {
        this.clearableWarnings.forEach(w => this.level.remove(w));
        this.clearableWarnings = [];
    }

    public onPunishClicked(callback: () => void) {
        this.punishCallback = callback;
    }


}