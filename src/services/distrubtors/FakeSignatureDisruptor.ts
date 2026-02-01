import ContextDisruptor from "../ContextDisruptor";
import {DisruptionDescription} from "../../data/DisruptionDescription";
import {faker} from "@faker-js/faker/locale/fr";
import {Context} from "../../data/Context";


export class FakeSignatureDisruptor implements ContextDisruptor {
    private readonly rate: number;

    constructor(rate: number) {
        this.rate = rate;
    }

    disturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.rate;

        if (willBeDisrupted) {
            context.idCard.signature = this.getFakeSignature(context);
            return [{
                origin: "Attestation",
                description: "La signature est fausse.",
                punishable: true
            }];
        }else {
            return [];
        }
    }

    private getFakeSignature(context: Context) {
        let fakeName = context.idCard.name;
        while (fakeName == context.idCard.name){
            fakeName = faker.person.lastName(context.idCard.sex === "M" ? "male" : "female");
        }
        return fakeName.toUpperCase();
    }
}