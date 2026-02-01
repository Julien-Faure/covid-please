import ContextDisruptor from "../ContextDisruptor";
import {DisruptionDescription} from "../../data/DisruptionDescription";
import {Context} from "../../data/Context";
import {randomBoolean} from "../../utils/Random";
import {faker} from "@faker-js/faker/locale/fr";
import {removeAccents} from "../../utils/String";
import {formatToFrDate} from "../../utils/Date";
import {AttestationReason} from "../../dto/AttestationDto";


export class ConvocationDisruptor implements ContextDisruptor {
    private readonly badName: number;
    private readonly badDate: number;
    private readonly badLocation: number;

    constructor(badName: number, badDate: number, badLocation: number) {
        this.badName = badName;
        this.badDate = badDate;
        this.badLocation = badLocation;
    }

    disturb(context: Context): DisruptionDescription[] {
        const d: DisruptionDescription[] = [];

        if(context.realReason === AttestationReason.JUSTICE){
            d.push(...this.disturbName(context));
            d.push(...this.badDateDisturb(context));
            d.push(...this.disturbLocation(context));
        }

        return d;
    }


    private disturbName(context: Context) {
        const willBeDisrupted = Math.random() < this.badName;

        if (willBeDisrupted) {
            if (randomBoolean()) {
                context.convocation.name = removeAccents(faker.person.lastName());
            } else {
                context.convocation.surname = removeAccents(faker.person.firstName());
            }
            return [{
                origin: "Convocation judiciaire",
                description: "Mauvais nom/prenom",
                punishable: true
            }];
        } else {
            return [];
        }
    }

    private badDateDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.badDate;

        if (willBeDisrupted) {
            if (randomBoolean()) {
                context.attestation.date = formatToFrDate(faker.date.recent({days: 200}));
            } else {
                context.attestation.date = formatToFrDate(faker.date.soon({days: 200}));
            }
            return [{
                origin: "Convocation judiciaire",
                description: "La convocation n'est pas pour aujourd'hui.",
                punishable: true
            }];
        } else {
            return [];
        }
    }

    private disturbLocation(context: Context) {
        const willBeDisrupted = Math.random() < this.badLocation;

        if (willBeDisrupted) {
            context.convocation.name = removeAccents(faker.location.city());

            return [{
                origin: "Convocation judiciaire",
                description: "Mauvaise ville",
                punishable: true
            }];
        } else {
            return [];
        }
    }
}