import {Actor, Color, Engine, GraphicsGroup, Text, vec, Vector} from "excalibur";
import {ZIndex} from "../views/ZIndex";
import {StudentDto} from "../dto/StudentDto";
import {Resources} from "../resources";
import {getColoredText} from "../utils/Graphics";


export class StudentCard extends Actor{
    private readonly studentDto: StudentDto;

    constructor(pos: Vector, studentDto: StudentDto) {
        super({
            pos,
            anchor: vec(0, 0),
            width: 200,
            height: 120,
            z: ZIndex.next()
        });

        this.studentDto = studentDto;
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const background = Resources.EmptyStudentCard.toSprite();

        const group = new GraphicsGroup({
            members: [
                {graphic: background, offset: vec(0, 0)},

                {graphic: this.aTitle("Carte etudiante"), offset: vec(72, 10)},

                {graphic: Resources.MiniNPCID.toSprite({
                        opacity: 0.8
                    }), offset: vec(8, 30)},

                {graphic: this.aLabel("Nom:"), offset: vec(72, 35)},
                {graphic: this.aText(this.studentDto.name), offset: vec(100, 33)},

                {graphic: this.aLabel("Prenom:"), offset: vec(72, 50)},
                {graphic: this.aText(this.studentDto.surname), offset: vec(117, 48)},

                {graphic: this.aLabel("Validite"), offset: vec(72, 65)},
                {graphic: this.aText(this.studentDto.validityDate), offset: vec(76, 75)},

                {graphic: this.aLabel("Emise"), offset: vec(72, 90)},
                {graphic: this.aText(this.studentDto.deliveryDate), offset: vec(76, 100)}
            ]
        });

        this.graphics.use(group);
    }

    private aText(text : string) : Text {
        return getColoredText(text, "ARCADEPI", 11, Color.fromHex('#ffffff'));
    }

    private aLabel(text : string) : Text {
        return getColoredText(text, "ARCADEPI", 9, Color.fromHex('#b6b6b6'));
    }

    private aTitle(text : string) : Text {
        return getColoredText(text, "ARCADEPI", 12, Color.fromHex('#ffffff'));
    }
}