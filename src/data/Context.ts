import IDCardDto from "../dto/IDCardDto";
import AttestationDto from "../dto/AttestationDto";
import {WorkCertDto} from "../dto/WorkCertDto";
import {ConvocationDto} from "../dto/ConvocationDto";
import {TicketDto} from "../dto/TicketDto";


export interface Context {
    punishable: boolean,
    idCard: IDCardDto,
    attestation: AttestationDto,
    workCert: WorkCertDto,
    convocation: ConvocationDto,
    ticket: TicketDto
}