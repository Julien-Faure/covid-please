import * as ex from "excalibur";
import {Actor, Vector} from "excalibur";
import {View} from "./View";
import {Level} from "../Level";
import {DeskBackground} from "../background/DeskBackground";
import {IDCard} from "../actors/IDCard";
import {Draggable} from "../utils/Draggable";
import {Attestation} from "../actors/Attestation";
import {AttestationReason} from "../dto/AttestationDto";

const VIEW_WIDTH = 1014;
const VIEW_HEIGHT = 487;

const POSITION_X = 266;
const POSITION_Y = 233;

export class DeskView implements View {
    private readonly level: Level;
    private draggables: Draggable[] = [];

    constructor(level: Level) {
        this.level = level;
    }

    init(): void {
        let background = new DeskBackground(new ex.Vector(POSITION_X, POSITION_Y));
        let emptyIDCard = new IDCard(new ex.Vector(POSITION_X + 12, POSITION_Y + 12), {
            name: "Becle",
            surname: "Denis",
            dateOfBirth: "14.02.1998",
            height: "1m75",
            signatureFontId: 0,
            birthPlace: "JSP",
            number1: "123456789",
            number2: "1151D1",
            sex: "M"
        });


        const attestation = new Attestation(new ex.Vector(POSITION_X + (300 ), POSITION_Y + (50 )), {
            name: "Becle",
            surname: "Denis",
            date: "31/01/2026",
            fontId: 0,
            reasons: [
                AttestationReason.FAMILY
            ],
            dateOfBirth: "14/02/1998"
        });

        this.level.add(attestation)
        this.enableDraggable(attestation);

        this.level.add(background)
        this.level.add(emptyIDCard)


        this.enableDraggable(emptyIDCard);


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


}