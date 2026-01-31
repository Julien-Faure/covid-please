import * as ex from "excalibur";
import {View} from "./View";
import {Level} from "../Level";
import {DeskBackground} from "../background/DeskBackground";
import {EmptyIDCard} from "../actors/EmptyIDCard";
import {EmptyAttestation} from "../actors/EmptyAttestation";
import {Draggable} from "../utils/Draggable";
import {Vector} from "excalibur";

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
        this.level.add(background)

        let emptyIDCard = new EmptyIDCard(new ex.Vector(POSITION_X + 12, POSITION_Y + 12));
        this.level.add(emptyIDCard)
        this.draggables.push(new Draggable(emptyIDCard, this, {
            bringToFront: true,
            clampToScreen: true
        }));

        let emptyAttestation = new EmptyAttestation(new ex.Vector(POSITION_X + 250, POSITION_Y + 100));
        this.level.add(emptyAttestation)
        this.draggables.push(new Draggable(emptyAttestation, this, {
            bringToFront: true,
            clampToScreen: true
        }));

        background.on("pointerleave", () => {
            this.draggables.forEach(value => value.stopDragging());
            document.body.style.cursor = "default";
        });
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