
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
    FAMILY,
    SPORT,
    WALK,
    MARKET,
    HEALTH,
    JUSTICE
}