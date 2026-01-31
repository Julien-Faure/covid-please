import ContextGenerator from "./ContextGenerator";
import {Context} from "../data/Context";
import {faker} from "@faker-js/faker/locale/fr";
import {randomBoolean, randomInt} from "../utils/Random";
import {FontMapper} from "../mappers/FontMapper";


export class ContextGeneratorBasicImpl implements ContextGenerator {

    private readonly config = {
        punishableRatio: 0.1
    }

    constructor() {


    }

    generate(): Context {

        const idCardFormatter = new Intl.DateTimeFormat("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        const attestationFormatter = new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        const dateOfBirth = faker.date.birthdate({min: 18, max: 65, mode: 'age'});

        const isFemale = randomBoolean();

        const name = faker.person.lastName(isFemale ? "female" : "male");
        const surname = faker.person.firstName(isFemale ? "female" : "male");

        let signatureFontId = randomInt(0, FontMapper.getFontCount() - 1);
        const ctx : Context = {
            punishable: Math.random() < this.config.punishableRatio,
            idCard: {
                number1: faker.string.alphanumeric(8).toUpperCase(),
                number2: faker.string.alphanumeric(4).toUpperCase(),
                dateOfBirth: idCardFormatter.format(dateOfBirth),
                height: `1m${faker.number.int({min: 40, max: 99})}`,
                name: name,
                surname: surname,
                sex: isFemale ? "F" : "M",
                birthPlace: faker.location.city(),
                signatureFontId: signatureFontId
            },
            attestation : {
                name: name,
                surname: surname,
                dateOfBirth: attestationFormatter.format(dateOfBirth),
                date: attestationFormatter.format(new Date()),
                reasons: [randomInt(0, 6)],
                fontId: signatureFontId
            }
        };


        return ctx;
    }

}