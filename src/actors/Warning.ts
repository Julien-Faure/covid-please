import {Actor, Color, Engine, GraphicsGroup, Text, vec, Vector} from "excalibur";
import {ZIndex} from "../views/ZIndex";
import {WarningDto} from "../dto/WarningDto";
import {Resources} from "../resources";
import {getColoredText} from "../utils/Graphics";
import {removeAccents} from "../utils/String";


export class Warning extends Actor {
    private readonly warningDto: WarningDto;

    constructor(pos: Vector, warningDto: WarningDto) {
        super({
            pos,
            anchor: vec(0, 0),
            width: 467,
            height: 330,
            z: ZIndex.next()
        });

        this.warningDto = warningDto;
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);

        const background = Resources.EmptyWarning.toSprite();

        const group =  new GraphicsGroup({
            members: [
                background,
                {
                    graphic: this.aTitle(" -- AVERTISSEMENT -- "), offset: vec(77, 10)
                },
                {
                    graphic: this.aName("Source : " +removeAccents(this.warningDto.error.origin)), offset: vec(10, 70)
                },
                {
                    graphic: this.aDescription("Description : " + removeAccents(this.warningDto.error.description)), offset: vec(10, 100)
                }
            ]
        });

        this.graphics.use(group);
    }

    private aTitle(text: string) : Text {
        return getColoredText(text, "ARCADEPI", 20, Color.fromHex('#ffffff'));
    }

    private aName(text: string) : Text {
        return getColoredText(text, "ARCADEPI", 16, Color.fromHex('#ffffff'));
    }

    private aDescription(text: string) : Text {
        return getColoredText(text, "ARCADEPI", 10, Color.fromHex('#ffffff'));
    }
}