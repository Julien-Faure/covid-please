import * as ex from "excalibur";
import {View} from "./View";
import {MyLevel} from "../level";
import {DeskBackground} from "../background/DeskBackground";


export class DeskView implements View {
    private readonly level: MyLevel;

    constructor(level : MyLevel) {
        this.level = level;
    }

    init(): void {
        this.level.add(new DeskBackground(new ex.Vector(200,175)))
    }

    dispose(): void {
    }


}