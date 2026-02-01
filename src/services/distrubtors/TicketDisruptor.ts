import ContextDisruptor from "../ContextDisruptor";
import {DisruptionDescription} from "../../data/DisruptionDescription";
import {Context} from "../../data/Context";
import {faker} from "@faker-js/faker/locale/fr";
import {randomBoolean} from "../../utils/Random";
import {formatToFrDate} from "../../utils/Date";
import {AttestationReason} from "../../dto/AttestationDto";


export class TicketDisruptor implements ContextDisruptor {
    private readonly dateRate: number;
    private readonly locationRate: number;

    constructor(dateRate: number, locationRate: number) {
        this.dateRate = dateRate;
        this.locationRate = locationRate;
    }

    disturb(context: Context): DisruptionDescription[] {
        const d: DisruptionDescription[] = [];

        if(context.realReason === AttestationReason.MARKET){
            d.push(...this.dateDisturb(context));
            d.push(...this.locationDisturb(context));
        }

        return d;
    }

    private dateDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.dateRate;

        if (willBeDisrupted) {
            if (randomBoolean()) {
                context.ticket.date = formatToFrDate(faker.date.recent({days: 200}));
            } else {
                context.ticket.date = formatToFrDate(faker.date.soon({days: 200}));
            }
            return [{
                origin: "Ticket de caisse",
                description: "La date est mauvaise.",
                punishable: true
            }];
        } else {
            return [];
        }
    }

    private locationDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.locationRate;

        if (willBeDisrupted) {
            context.ticket.location = faker.location.city();
            return [{
                origin: "Ticket de caisse",
                description: "Le lieu est mauvais.",
                punishable: true
            }];
        } else {
            return [];
        }
    }
}