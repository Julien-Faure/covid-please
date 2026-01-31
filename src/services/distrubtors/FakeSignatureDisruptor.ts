import {ContextDisruptor} from "../ContextDisruptor";
import {DisruptionDescription} from "../../data/DisruptionDescription";
import {faker} from "@faker-js/faker/locale/fr";


export class FakeSignatureDisruptor implements ContextDisruptor {
    private readonly rate: number;

    constructor(rate: number) {
        this.rate = rate;
    }

    disturb(context: Context): DisruptionDescription | undefined {
        const willBeDisrupted = Math.random() < this.rate;

        if (willBeDisrupted) {
            context.idCard.signature = faker.person.lastName(context.idCard.sex === "M" ? "male" : "female");
            return {
                name: "Fausse signature",
                description: "La signature de la carte d'identité est remplacée par une signature fausse."
            };
        }else {
            return undefined;
        }
    }

}