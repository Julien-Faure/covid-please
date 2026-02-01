import ContextDisruptor from "../ContextDisruptor";
import {DisruptionDescription} from "../../data/DisruptionDescription";
import {Context} from "../../data/Context";
import {faker} from "@faker-js/faker/locale/fr";
import {removeAccents} from "../../utils/String";
import {AttestationReason} from "../../dto/AttestationDto";


export class WorkCertDisruptor implements ContextDisruptor {
    private readonly badSignatureRate;
    private readonly badPersonNameRate;

    constructor(badSignatureRate: number, badPersonNameRate: number) {
        this.badSignatureRate = badSignatureRate;
        this.badPersonNameRate = badPersonNameRate;
    }

    disturb(context: Context): DisruptionDescription[] {
        const d: DisruptionDescription[] = [];

        if(context.realReason === AttestationReason.WORK){
            d.push(...this.badSignatureDisturb(context));
            d.push(...this.badPersonName(context));
        }

        return d;
    }

    private badSignatureDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.badSignatureRate;

        if(willBeDisrupted){
            context.workCert.signature = removeAccents(faker.company.name());
            return [
                {
                    origin: "Certificat de travail",
                    description: "La signature est fausse.",
                    punishable: true
                }
            ]
        }else{
            return []
        }
    }


    private badPersonName(context: Context) {
        const willBeDisrupted = Math.random() < this.badPersonNameRate;

        if(willBeDisrupted){
            context.workCert.name = faker.person.lastName()
            return [{
                origin: "Certificat de travail",
                description: "Le nom de la personne n'est pas le même.",
                punishable: true
            }]
        }else {
            return [];
        }
    }
}