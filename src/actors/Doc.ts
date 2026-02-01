import {Actor, Color, Engine, GraphicsGroup, Text, vec, Vector} from "excalibur";
import {ZIndex} from "../views/ZIndex";
import {Resources} from "../resources";
import {getColoredText} from "../utils/Graphics";
import {DocDto} from "../dto/DocDto";


export class Doc extends Actor {
    private readonly docDto: DocDto;

    constructor(pos: Vector, sportDto: DocDto) {
        super({
            pos,
            anchor: vec(0, 0),
            width: 110,
            height: 233,
            z: ZIndex.next()
        });

        this.docDto = sportDto;
    }


    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const background = Resources.Doc.toSprite();

        const group = new GraphicsGroup({
            members: [
                {graphic: background, offset: vec(0, 0)},

                {graphic: this.aWhiteText(this.docDto.date), offset: vec(37, 35)},
                {graphic: this.aBlackText(this.docDto.name), offset: vec(37, 191)}
            ]
        });

        this.graphics.use(group);
    }


    private aWhiteText(text: string): Text {
        return getColoredText(text, "ARCADEPI", 9, Color.fromHex('#ffffff'));
    }

    private aBlackText(text: string): Text {
        return getColoredText(text, "ARCADEPI", 9, Color.fromHex('#000000'));
    }

}