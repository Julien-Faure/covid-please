import {Actor, Engine, GraphicsGroup, Text, vec, Vector} from "excalibur";
import {ZIndex} from "../views/ZIndex";
import {Resources} from "../resources";
import {WorkCertDto} from "../dto/WorkCertDto";
import {getText} from "../utils/Graphics";
import {FontMapper} from "../mappers/FontMapper";


export class WorkCert extends Actor {

    private readonly dto;

    constructor(pos: Vector, workCert: WorkCertDto) {
        super({
            pos,
            anchor: vec(0, 0),
            width: 330,
            height: 125,
            z: ZIndex.next()
        });

        this.dto = workCert;
    }


    override onInitialize(engine: Engine): void {
        super.onInitialize(engine)
        const background = Resources.WorkCert.toSprite();
        background.width = this.width;
        background.height = this.height;

        const group = new GraphicsGroup({
            members: [
                {graphic: background, offset: vec(0, 0)},
                {graphic: this.aText(this.dto.name), offset: vec(220, 26)},
                {graphic: this.aText(this.dto.company), offset: vec(115, 43)},
                {graphic: this.aText(this.dto.position), offset: vec(60, 62)},
                {graphic: this.aSignature(this.dto.company, this.dto.signatureFontId), offset: vec(150, 80)},
            ]
        });


        this.graphics.use(group);
    }

    private aText(text: string) : Text {
        return getText(text, "ARCADEPI", 11);
    }

    private aSignature(text: string, fontId: number) : Text {
        return getText(text, FontMapper.getFont(fontId), 20);
    }

}