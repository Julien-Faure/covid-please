import ContextDisruptor from "../ContextDisruptor";
import {DisruptionDescription} from "../../data/DisruptionDescription";
import {Context} from "../../data/Context";
import {faker} from "@faker-js/faker/locale/fr";
import {randomBoolean} from "../../utils/Random";
import {formatToFrDate} from "../../utils/Date";
import {removeAccents} from "../../utils/String";
import {AttestationReason} from "../../dto/AttestationDto";


export class StudentDisruptor implements ContextDisruptor {
    private readonly badValidityDate: number;
    private readonly badIssueDate: number;
    private readonly badNameOrSurname: number;

    constructor(badValidityDate: number, badIssueDate: number, badNameOrSurname: number) {
        this.badValidityDate = badValidityDate;
        this.badIssueDate = badIssueDate;
        this.badNameOrSurname = badNameOrSurname;
    }

    disturb(context: Context): DisruptionDescription[] {
        const d: DisruptionDescription[] = [];

        if(context.realReason === AttestationReason.STUDY){
            d.push(...this.badValidityDateDisturb(context));
            d.push(...this.badIssueDateDisturb(context));
            d.push(...this.badNameOrSurnameDisturb(context));
        }

        return d;
    }

    private badValidityDateDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.badValidityDate;

        if (willBeDisrupted) {
            context.student.validityDate = formatToFrDate(faker.date.past({years: 5}));
            return [{
                origin: "Carte étudiante",
                description: "La date de validité est expirée.",
                punishable: true
            }];
        } else {
            return [];
        }
    }

    private badIssueDateDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.badIssueDate;

        if (willBeDisrupted) {
            context.student.deliveryDate = formatToFrDate(faker.date.future({years: 1}));
            return [{
                origin: "Carte étudiante",
                description: "La date d'émission est dans le futur.",
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
                context.student.name = removeAccents(faker.person.lastName().toUpperCase());
            } else {
                context.student.surname = removeAccents(faker.person.firstName());
            }
            return [{
                origin: "Carte étudiante",
                description: "Mauvais nom ou prénom.",
                punishable: true
            }];
        } else {
            return [];
        }
    }
}
