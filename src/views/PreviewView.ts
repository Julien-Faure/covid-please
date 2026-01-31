import * as ex from "excalibur";
import {View} from "./View";
import {Level} from "../Level";
import {PreviewBackground} from "../background/PreviewBackground";

const POSITION_X = 0;
const POSITION_Y = 233;

export class PreviewView implements View {
    private readonly level: Level;

    constructor(level: Level) {
        this.level = level;
    }


    init(): void {
        this.level.add(new PreviewBackground(new ex.Vector(POSITION_X, POSITION_Y)))
    }

    dispose(): void {
    }


}