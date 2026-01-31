
export default interface AttestationDto {
    name: string,
    surname: string,
    dateOfBirth: string,
    reasons: AttestationReason[],
    date: string,
    signature: number
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