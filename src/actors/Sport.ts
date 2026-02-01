import {Actor, Color, Engine, GraphicsGroup, Text, vec, Vector} from "excalibur";
import {ZIndex} from "../views/ZIndex";
import {SportDto} from "../dto/SportDto";
import {Resources} from "../resources";
import {getColoredText} from "../utils/Graphics";


export class Sport extends Actor {
    private readonly sportDto: SportDto;

    constructor(pos: Vector, sportDto: SportDto) {
        super({
            pos,
            anchor: vec(0, 0),
            width: 110,
            height: 233,
            z: ZIndex.next()
        });

        this.sportDto = sportDto;
    }


    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const background = Resources.Strava.toSprite();

        const group = new GraphicsGroup({
            members: [
                {graphic: background, offset: vec(0, 0)},

                {graphic: this.aText(this.sportDto.duration), offset: vec(15, 167)},
                {graphic: this.aBigText(this.sportDto.distance), offset: vec(20, 202)}
            ]
        });

        this.graphics.use(group);
    }


    private aText(text: string): Text {
        return getColoredText(text, "ARCADEPI", 11, Color.fromHex('#000000'));
    }

    private aBigText(text: string): Text {
        return getColoredText(text, "ARCADEPI", 16, Color.fromHex('#000000'));
    }

}