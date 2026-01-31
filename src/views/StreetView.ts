import * as ex from "excalibur";
import {View} from "./View";
import {MyLevel} from "../level";
import {StreetBackground} from "../background/StreetBackground";


export class StreetView implements View {
    init(level: MyLevel): void {
        level.add(new StreetBackground(new ex.Vector(0,0)));
    }

}