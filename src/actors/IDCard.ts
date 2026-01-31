import {Actor, Color, Engine, GraphicsGroup, Text, vec, Vector} from "excalibur";
import {Resources} from "../resources";
import {ZIndex} from "../views/ZIndex";
import IDCardDto from "../dto/IDCardDto";
import {getColoredText, getText} from "../utils/Graphics";
import {FontMapper} from "../mappers/FontMapper";

export class IDCard extends Actor {
    private readonly dto: IDCardDto;

    constructor(pos: Vector, dto: IDCardDto) {
        super({
            pos,
            anchor: vec(0, 0),
            width: 225,
            height: 150,
            z: ZIndex.next()
        });

        this.dto = dto;
    }


    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const idCardSprite = Resources.IDCard.toSprite();
        idCardSprite.width = this.width;
        idCardSprite.height = this.height;

        const group = new GraphicsGroup({
            members: [
                {graphic: idCardSprite, offset: vec(0, 0)},

                {graphic: this.aTitle("  REPUBLIQUE  FRANCAISE"), offset: vec(5, 2)},

                {graphic: this.aLabel("CARTE NATIONALE D'IDENTITE N°: "), offset: vec(10, 15)},
                {graphic: this.aTinnyText(this.dto.number1), offset: vec(150, 15)},

                {graphic: this.aLabel("Nom: "), offset: vec(73, 30)},
                {graphic: this.aText(this.dto.name), offset: vec(100, 27)},

                {graphic: this.aLabel("Prénom(s): "), offset: vec(73, 50)},
                {graphic: this.aText(this.dto.surname), offset: vec(115, 44)},

                {graphic: this.aLabel("Sexe: "), offset: vec(73, 70)},
                {graphic: this.aText(this.dto.sex), offset: vec(100, 66)},

                {graphic: this.aLabel("Né(e) le: "), offset: vec(120, 70)},
                {graphic: this.aLittleText(this.dto.dateOfBirth), offset: vec(157, 68)},

                {graphic: this.aLabel("A : "), offset: vec(73, 80)},
                {graphic: this.aLittleText(this.dto.birthPlace), offset: vec(90, 77)},

                {graphic: this.aLabel("Taille : "), offset: vec(73, 90)},
                {graphic: this.aLittleText(this.dto.height), offset: vec(107, 87)},

                {graphic: this.aLabel("Signature : "), offset: vec(73, 100)},
                {graphic: this.aSignature(this.dto.name,this.dto.signatureFontId), offset: vec(140, 90)},

                {graphic: this.aBottomLabel(`IDFRA${this.dto.name} <<<<<<<<<<<<<<<<<<<<<<`), offset: vec(10, 115)},
                {graphic: this.aBottomLabel(`${this.dto.number1}${this.dto.surname}<<<<<<<${this.dto.number2}`), offset: vec(10, 130)},
            ]
        });


        this.graphics.use(group);
    }

    private aText(text: string) : Text {
        return getText(text, "ARCADEPI", 13);
    }

    private aTinnyText(text: string) : Text {
        return getText(text, "ARCADEPI", 7);
    }

    private aLittleText(text: string) : Text {
        return getText(text, "ARCADEPI", 9);
    }

    private aLabel(text: string) : Text {
        return getColoredText(text, "ARCADEPI", 7, Color.fromHex('#4746a8'));
    }

    private aBottomLabel(text: string) : Text {
        return getColoredText(text.toUpperCase(), "ARCADEPI", 10, Color.fromHex('#272727'));
    }

    private aTitle(text: string) : Text {
        return getColoredText(text.toUpperCase(), "ARCADEPI", 11, Color.White);
    }

    private aSignature(text : string, font : number) : Text {
        return getText(text, FontMapper.getFont(font), 20);
    }
}

