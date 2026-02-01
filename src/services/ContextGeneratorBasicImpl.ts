import ContextGenerator from "./ContextGenerator";
import {Context} from "../data/Context";
import {faker} from "@faker-js/faker/locale/fr";
import {randomBoolean, randomInt} from "../utils/Random";
import {FontMapper} from "../mappers/FontMapper";
import {removeAccents} from "../utils/String";


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

        const classicFormatter = new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        const dateOfBirth = faker.date.birthdate({min: 18, max: 65, mode: 'age'});
        const actualDate = new Date();

        const isFemale = randomBoolean();

        const name = removeAccents(faker.person.lastName(isFemale ? "female" : "male"));
        const surname = removeAccents(faker.person.firstName(isFemale ? "female" : "male"));
        let birthPlace = removeAccents(faker.location.city());

        let signatureFontId = randomInt(0, FontMapper.getFontCount() - 1);
        const ctx: Context = {
            punishable: Math.random() < this.config.punishableRatio,
            idCard: {
                number1: faker.string.alphanumeric(8).toUpperCase(),
                number2: faker.string.alphanumeric(4).toUpperCase(),
                dateOfBirth: idCardFormatter.format(dateOfBirth),
                height: `1m${faker.number.int({min: 40, max: 99})}`,
                name: name,
                surname: surname,
                sex: isFemale ? "F" : "M",
                birthPlace: birthPlace,
                signatureFontId: signatureFontId,
                signature: name.toUpperCase()
            },
            attestation: {
                name: name,
                surname: surname,
                dateOfBirth: classicFormatter.format(dateOfBirth),
                date: classicFormatter.format(new Date()),
                reasons: [randomInt(0, 5)],
                fontId: signatureFontId
            },
            workCert: {
                name: name,
                company: removeAccents(faker.company.name()),
                position: removeAccents(faker.person.jobTitle()),
                signatureFontId: signatureFontId
            },
            convocation: {
                name: name,
                surname: surname,
                date: classicFormatter.format(actualDate),
                location: "Montpellier, France"
            },
            ticket: {
                date: classicFormatter.format(actualDate),
                location: "Montpellier"
            },
            student: {
                deliveryDate: classicFormatter.format(new Date(actualDate.getTime() - (randomInt(365, 365*4) * 24 * 60 * 60 * 1000))),
                validityDate: classicFormatter.format(new Date(actualDate.getTime() + (randomInt(365, 365*4) * 24 * 60 * 60 * 1000))),
                name: name,
                surname: surname
            },
            sport: {
                duration: randomInt(5, 30) + " min",
                distance: randomInt(100, 1000) + " m"
            }
        };


        return ctx;
    }

}