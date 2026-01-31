import * as ex from "excalibur";
import {View} from "./View";
import {Level} from "../Level";
import {DeskBackground} from "../background/DeskBackground";
import {EmptyIDCard} from "../actors/EmptyIDCard";
import {EmptyAttestation} from "../actors/EmptyAttestation";


export class DeskView implements View {
    private readonly level: Level;

    constructor(level : Level) {
        this.level = level;
    }

    init(): void {
        this.level.add(new DeskBackground(new ex.Vector(200,175)))
        this.level.add(new EmptyIDCard(new ex.Vector(250,180)))
        this.level.add(new EmptyAttestation(new ex.Vector(250+250,220)))
    }

    dispose(): void {
    }


}