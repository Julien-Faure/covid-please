import ContextDisruptor from "../ContextDisruptor";
import {DisruptionDescription} from "../../data/DisruptionDescription";
import {Context} from "../../data/Context";
import {faker} from "@faker-js/faker/locale/fr";
import {randomBoolean, randomInt} from "../../utils/Random";
import {formatToFrDate} from "../../utils/Date";
import {removeAccents} from "../../utils/String";


export class AttestationDisruptor implements ContextDisruptor {
    private readonly badDate: number;
    private readonly badNameOrSurname: number;
    private readonly badReason: number;

    constructor(badDate: number, badNameOrSurname: number, badReason: number) {
        this.badDate = badDate;
        this.badNameOrSurname = badNameOrSurname;
        this.badReason = badReason;
    }

    disturb(context: Context): DisruptionDescription[] {
        const d: DisruptionDescription[] = [];

        d.push(...this.badDateDisturb(context));
        d.push(...this.badNameOrSurnameDisturb(context));
        d.push(...this.badReasonDisturb(context));

        return d;
    }




    private badDateDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.badDate;

        if (willBeDisrupted) {
            if (randomBoolean()) {
                context.attestation.date = formatToFrDate(faker.date.recent({days: 200}));
            }else {
                context.attestation.date = formatToFrDate(faker.date.soon({days: 200}));
            }
            return [{
                origin: "Attestation",
                description: "La date est mauvaise.",
                punishable: true
            }];
        } else {
            return [];
        }
    }

    private badNameOrSurnameDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.badNameOrSurname;

        if (willBeDisrupted) {
            if (randomBoolean()) {
                context.attestation.name = removeAccents(faker.person.lastName())
            }else {
                context.attestation.surname = removeAccents(faker.person.firstName())
            }
            return [{
                origin: "Attestation",
                description: "Mauvais nom ou prénom.",
                punishable: true
            }];
        } else {
            return [];
        }
    }

    private badReasonDisturb(context: Context) : DisruptionDescription[] {

        const willBeDisrupted = Math.random() < this.badReason;

        if (willBeDisrupted) {
            const oldReasons = context.attestation.reasons[0];
            context.attestation.reasons = [randomInt(0,5)];
            return [{
                origin: "Attestation",
                description: "Mauvaise raison",
                punishable: context.attestation.reasons[0] !== oldReasons,
            }];
        } else {
            return [];
        }
    }
}