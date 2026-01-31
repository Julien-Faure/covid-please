import * as ex from "excalibur";
import {View} from "./View";
import {MyLevel} from "../level";
import {PreviewBackground} from "../background/PreviewBackground";


export class PreviewView implements View {
    init(level: MyLevel): void {
        level.add(new PreviewBackground(new ex.Vector(0,175)))
    }

}