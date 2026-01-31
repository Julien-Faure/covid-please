import {Actor, Engine, GraphicsGroup, Text, vec, Vector} from "excalibur";
import {EmptyAttestation} from "./EmptyAttestation";
import AttestationDto, {AttestationReason} from "../dto/AttestationDto";
import {getText} from "../utils/Graphics";
import {FontMapper} from "../mappers/FontMapper";
import {ZIndex} from "../views/ZIndex";

export class Attestation extends Actor {
    private readonly attestationDto : AttestationDto;

    constructor(pos : Vector, attestationDto : AttestationDto) {
        super({
            pos,
            anchor: vec(0, 0),
            width: 330,
            height: 467,
            z: ZIndex.next()
        });

        this.attestationDto = attestationDto;
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const emptyAttestation = new EmptyAttestation(this.width, this.height);


        const group = new GraphicsGroup({
            members: [
                {graphic: emptyAttestation, offset: vec(0, 0)},
                {
                    graphic: this.aText(this.attestationDto.name), offset: vec(72, 109)
                },
                {
                    graphic: this.aText(this.attestationDto.surname), offset: vec(98, 124)
                },
                {
                    graphic: this.aText(this.attestationDto.dateOfBirth), offset: vec(190, 140)
                },
                {
                    graphic: this.aText(this.attestationDto.date), offset: vec(75, 372)
                },
                {
                    graphic: this.aText(this.attestationDto.name.toUpperCase()), offset: vec(190, 400)
                }
            ]
        });

        this.attestationDto.reasons.forEach(reason => {
            group.members.push({
                graphic : this.aText("X"), offset: this.getReasonOffset(reason)
            })
        });

        this.graphics.add(group)
    }

    private getReasonOffset(reason : AttestationReason) : Vector {
        switch (reason) {
            case AttestationReason.FAMILY: return vec(32, 190);
            case AttestationReason.HEALTH: return vec(32, 215);
            case AttestationReason.WORK: return vec(32, 240);
            case AttestationReason.SPORT: return vec(32, 270);
            case AttestationReason.JUSTICE: return vec(32, 295);
            case AttestationReason.WALK: return vec(32, 325);
            default: return vec(0,0);
        }
    }

    private aText(text : string) : Text {
        return getText(text, FontMapper.getFont(this.attestationDto.fontId), 16);
    }
}