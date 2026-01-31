import IDCardDto from "../dto/IDCardDto";
import AttestationDto from "../dto/AttestationDto";


export interface Context {
    punishable: boolean,
    idCard: IDCardDto,
    attestation: AttestationDto
}