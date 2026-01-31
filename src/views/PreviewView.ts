import * as ex from "excalibur";
import {View} from "./View";
import {MyLevel} from "../level";
import {PreviewBackground} from "../background/PreviewBackground";


export class PreviewView implements View {
    private readonly level: MyLevel;

    constructor(level : MyLevel) {
        this.level = level;
    }


    init(): void {
        this.level.add(new PreviewBackground(new ex.Vector(0,175)))
    }

    dispose(): void {
    }


}