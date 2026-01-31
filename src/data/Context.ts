import IDCardDto from "../dto/IDCardDto";
import AttestationDto from "../dto/AttestationDto";
import {WorkCertDto} from "../dto/WorkCertDto";


export interface Context {
    punishable: boolean,
    idCard: IDCardDto,
    attestation: AttestationDto,
    workCert: WorkCertDto
}