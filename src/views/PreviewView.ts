import {View} from "./View";
import {Level} from "../Level";
import {PreviewBackground} from "../background/PreviewBackground";
import {vec, Vector} from "excalibur";
import {PunishButton} from "../actors/PunishButton";

const POSITION_X = 0;
const POSITION_Y = 233;

const VIEW_HEIGHT = 487;
const VIEW_WIDTH = 266;

export class PreviewView implements View {
    private readonly level: Level;
    private punishCallback : () => void = () => {};

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
        const punishButton = new PunishButton(vec(POSITION_X + VIEW_WIDTH - 50, POSITION_Y + VIEW_HEIGHT - 50));
        this.level.add(punishButton)
        punishButton.on('pointerdown', this.punishCallback)
    }

    dispose(): void {

    }

    public onPunishClicked(callback : () => void) {
        this.punishCallback = callback;
    }

}