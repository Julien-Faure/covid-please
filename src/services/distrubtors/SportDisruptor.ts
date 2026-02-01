import ContextDisruptor from "../ContextDisruptor";
import {DisruptionDescription} from "../../data/DisruptionDescription";
import {Context} from "../../data/Context";
import {randomInt} from "../../utils/Random";
import {AttestationReason} from "../../dto/AttestationDto";


export class SportDisruptor implements ContextDisruptor {
    private readonly distanceRate: number;
    private readonly durationRate: number;

    constructor(distanceRate: number, durationRate: number) {
        this.distanceRate = distanceRate;
        this.durationRate = durationRate;
    }

    disturb(context: Context): DisruptionDescription[] {
        const d: DisruptionDescription[] = [];

        if(context.realReason === AttestationReason.SPORT){
            d.push(...this.distanceDisturb(context));
            d.push(...this.durationDisturb(context));
        }

        return d;
    }

    private distanceDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.distanceRate;

        if (willBeDisrupted) {
            context.sport.distance = randomInt(1001, 9999) + " m";
            return [{
                origin: "Sport",
                description: "La distance est supérieure à 1KM.",
                punishable: true
            }];
        } else {
            return [];
        }
    }

    private durationDisturb(context: Context): DisruptionDescription[] {
        const willBeDisrupted = Math.random() < this.durationRate;

        if (willBeDisrupted) {
            context.sport.duration = randomInt(30, 300) + " min";
            return [{
                origin: "Sport",
                description: "La durée est supérieure à 30 min.",
                punishable: true
            }];
        } else {
            return [];
        }
    }
}
