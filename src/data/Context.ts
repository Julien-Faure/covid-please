import IDCardDto from "../dto/IDCardDto";
import AttestationDto, {AttestationReason} from "../dto/AttestationDto";
import {WorkCertDto} from "../dto/WorkCertDto";
import {ConvocationDto} from "../dto/ConvocationDto";
import {TicketDto} from "../dto/TicketDto";
import {StudentDto} from "../dto/StudentDto";
import {SportDto} from "../dto/SportDto";
import {DocDto} from "../dto/DocDto";


export interface Context {
    punishable: boolean,
    realReason : AttestationReason
    idCard: IDCardDto,
    attestation: AttestationDto,
    workCert: WorkCertDto,
    convocation: ConvocationDto,
    ticket: TicketDto,
    student: StudentDto,
    sport: SportDto,
    doc: DocDto
}