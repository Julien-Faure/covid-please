import ContextDisruptor from "../ContextDisruptor";
import {DisruptionDescription} from "../../data/DisruptionDescription";
import {Context} from "../../data/Context";
import {faker} from "@faker-js/faker/locale/fr";
import {randomBoolean} from "../../utils/Random";
import {formatToFrDate} from "../../utils/Date";
import {AttestationReason} from "../../dto/AttestationDto";

export class HealthDocDisruptor implements ContextDisruptor {
    private readonly dateRate: number;
    private readonly nameRate: number;

    constructor(dateRate: number, nameRate: number) {
        this.dateRate = dateRate;
        this.nameRate = nameRate;
    }

    disturb(context: Context): DisruptionDescription[] {
        const d: DisruptionDescription[] = [];

        if(context.realReason === AttestationReason.HEALTH){
            d.push(...this.dateDisturb(context));
            d.push(...this.nameDisturb(context));
        }

        return d;
    }

    private dateDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.dateRate;

        if (willBeDisrupted) {
            if (randomBoolean()) {
                context.doc.date = formatToFrDate(faker.date.recent({days: 200}));
            } else {
                context.doc.date = formatToFrDate(faker.date.soon({days: 200}));
            }
            return [{
                origin: "Document de santé",
                description: "Le RDV n'est pas pour aujourd'hui.",
                punishable: true
            }];
        } else {
            return [];
        }
    }

    private nameDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.nameRate;

        if (willBeDisrupted) {
            context.doc.name = faker.person.fullName();
            return [{
                origin: "Document de santé",
                description: "Le nom du patient est mauvais.",
                punishable: true
            }];
        } else {
            return [];
        }
    }
}
