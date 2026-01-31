
export default interface AttestationDto {
    name: string,
    surname: string,
    dateOfBirth: string,
    reasons: AttestationReason[],
    date: string,
    fontId: number
}

export enum AttestationReason {
    WORK,
    SPORT,
    STUDY,
    HEALTH,
    JUSTICE,
    MARKET
}