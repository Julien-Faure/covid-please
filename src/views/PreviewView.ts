import {View} from "./View";
import {Level} from "../Level";
import {PreviewBackground} from "../background/PreviewBackground";
import {vec, Vector} from "excalibur";

const POSITION_X = 0;
const POSITION_Y = 233;

const VIEW_HEIGHT = 266;
const VIEW_WIDTH = 487;

export class PreviewView implements View {
    private readonly level: Level;

    constructor(level: Level) {
        this.level = level;
    }

    getDimensions(): { width: number; height: number; } {
        return {width: VIEW_WIDTH, height: VIEW_HEIGHT};
    }
    getPosition(): Vector {
        return vec(POSITION_X, POSITION_Y);
    }


    init(): void {
        this.level.add(new PreviewBackground(vec(POSITION_X, POSITION_Y)))
    }

    dispose(): void {
    }


}