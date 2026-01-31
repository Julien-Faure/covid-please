import {Actor, Engine, GraphicsGroup, vec, Vector} from "excalibur";
import {EmptyAttestation} from "./EmptyAttestation";
import AttestationDto, {AttestationReason} from "../dto/AttestationDto";
import {getText} from "../utils/Graphics";

export class Attestation extends Actor {
    private readonly attestationDto : AttestationDto;

    constructor(pos : Vector, attestationDto : AttestationDto) {
        super({
            pos,
            anchor: vec(0, 0),
            width: 330,
            height: 467,
            z: 2
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
                    graphic: getText(this.attestationDto.name), offset: vec(72, 109)
                },
                {
                    graphic: getText(this.attestationDto.surname), offset: vec(98, 124)
                },
                {
                    graphic: getText(this.attestationDto.dateOfBirth), offset: vec(190, 140)
                },
                {
                    graphic: getText(this.attestationDto.date), offset: vec(75, 372)
                },
                {
                    graphic: getText(this.attestationDto.signature.toString()), offset: vec(190, 400)
                }
            ]
        });

        this.attestationDto.reasons.forEach(reason => {
            group.members.push({
                graphic : getText("X"), offset: this.getReasonOffset(reason)
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
}