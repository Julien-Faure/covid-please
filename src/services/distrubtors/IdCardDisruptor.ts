import ContextDisruptor from "../ContextDisruptor";
import {DisruptionDescription} from "../../data/DisruptionDescription";
import {Context} from "../../data/Context";
import {randomBoolean, randomInt} from "../../utils/Random";
import {faker} from "@faker-js/faker/locale/fr";
import {formatToDeDate} from "../../utils/Date";


export class IdCardDisruptor implements ContextDisruptor {
    private readonly heightRate: number;
    private readonly dobRate: number;

    constructor(heightRate: number, dobRate: number) {
        this.heightRate = heightRate;
        this.dobRate = dobRate;
    }


    disturb(context: Context): DisruptionDescription[] {
        const d: DisruptionDescription[] = [];

        d.push(...this.heightDisturb(context));
        d.push(...this.dobDisturb(context));

        return d;
    }

    private heightDisturb(context: Context) {
        const willBeDisrupted = Math.random() < this.heightRate;

        if (willBeDisrupted) {
            context.idCard.height = randomInt(5, 7) + "m" + randomInt(10, 90);
            return [{
                origin: "Carte d'indentité",
                description: "Taille abusé !",
                punishable: true
            }];
        } else {
            return [];
        }
    }

    private dobDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.dobRate;

        if (willBeDisrupted) {
            if (randomBoolean()) {
                const fake = faker.date.birthdate({min: 150, max: 300, mode: 'age'});
                context.idCard.dateOfBirth = formatToDeDate(fake);
            } else {
                const fake = new Date(new Date().getTime() + faker.date.birthdate({min: 1, max: 300, mode: 'age'}).getTime());
                context.idCard.dateOfBirth = formatToDeDate(fake);
            }

            return [{
                origin: "Carte d'identité",
                description: "La date de naissance !",
                punishable: true
            }];
        } else {
            return [];
        }

    }
}