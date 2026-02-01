import {Actor, Engine, GraphicsGroup, Text, vec, Vector} from "excalibur";
import {ZIndex} from "../views/ZIndex";
import {ConvocationDto} from "../dto/ConvocationDto";
import {getText} from "../utils/Graphics";
import {Resources} from "../resources";

export class Convocation extends Actor {
    private readonly convocationDto : ConvocationDto;

    constructor(pos : Vector, attestationDto : ConvocationDto) {
        super({
            pos,
            anchor: vec(0, 0),
            width: 330,
            height: 467,
            z: ZIndex.next()
        });

        this.convocationDto = attestationDto;
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const background = Resources.EmptyConvocation.toSprite();


        const group = new GraphicsGroup({
            members: [
                {graphic: background, offset: vec(0, 0)},
                {
                    graphic: this.aText(`${this.convocationDto.surname} ${this.convocationDto.name}`),
                    offset: vec(60, 150)
                },
                {
                    graphic: this.aText(`le ${this.convocationDto.date}`),
                    offset: vec(60, 210)
                },
                {
                    graphic: this.aText(`a ${this.convocationDto.location}`),
                    offset: vec(60, 230)
                }
            ]
        });

        this.graphics.add(group)
    }

    private aText(text : string) : Text {
        return getText(text, "ARCADEPI", 12);
    }

}