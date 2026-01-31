import * as ex from "excalibur";
import {View} from "./View";
import {MyLevel} from "../level";
import {DeskBackground} from "../background/DeskBackground";


export class DeskView implements View {
    constructor() {}

    init(level: MyLevel): void {
        level.add(new DeskBackground(new ex.Vector(200,175)))
    }
}