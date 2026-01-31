import * as ex from "excalibur";
import {View} from "./View";
import {Level} from "../Level";
import {DeskBackground} from "../background/DeskBackground";
import {EmptyIDCard} from "../actors/EmptyIDCard";
import {EmptyAttestation} from "../actors/EmptyAttestation";

const VIEW_WIDTH = 760;
const VIEW_HEIGHT = 175;

const POSITION_X = 266;
const POSITION_Y = 233;

export class DeskView implements View {
    private readonly level: Level;

    constructor(level : Level) {
        this.level = level;
    }

    init(): void {
        this.level.add(new DeskBackground(new ex.Vector(POSITION_X,POSITION_Y)))

        this.level.add(new EmptyIDCard(new ex.Vector(POSITION_X + 12,POSITION_Y + 12)))
        this.level.add(new EmptyAttestation(new ex.Vector(POSITION_X+250,POSITION_Y + 100)))
    }

    dispose(): void {
    }


}