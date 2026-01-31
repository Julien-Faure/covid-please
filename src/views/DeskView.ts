import * as ex from "excalibur";
import {View} from "./View";
import {Level} from "../Level";
import {DeskBackground} from "../background/DeskBackground";
import {EmptyIDCard} from "../actors/EmptyIDCard";
import {EmptyAttestation} from "../actors/EmptyAttestation";
import {makeDraggable} from "../utils/Draggable";
import {Vector} from "excalibur";

const VIEW_WIDTH = 1014;
const VIEW_HEIGHT = 487;

const POSITION_X = 266;
const POSITION_Y = 233;

export class DeskView implements View {
    private readonly level: Level;

    constructor(level : Level) {
        this.level = level;
    }

    init(): void {
        this.level.add(new DeskBackground(new ex.Vector(POSITION_X,POSITION_Y)))

        let emptyIDCard = new EmptyIDCard(new ex.Vector(POSITION_X + 12,POSITION_Y + 12));
        this.level.add(emptyIDCard)
        makeDraggable(emptyIDCard, this, {
            bringToFront: true,
            clampToScreen: true
        });

        let emptyAttestation = new EmptyAttestation(new ex.Vector(POSITION_X+250,POSITION_Y + 100));
        this.level.add(emptyAttestation)
        makeDraggable(emptyAttestation, this, {
            bringToFront: true,
            clampToScreen: true
        });
    }

    dispose(): void {
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