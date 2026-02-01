import {FakeSignatureDisruptor} from "./distrubtors/FakeSignatureDisruptor";
import {DisruptionDescription} from "../data/DisruptionDescription";
import {Context} from "../data/Context";
import {FinalContext} from "../data/FinalContext";
import ContextDisruptor from "./ContextDisruptor";
import {IdCardDisruptor} from "./distrubtors/IdCardDisruptor";
import {AttestationDisruptor} from "./distrubtors/AttestationDisruptor";
import {WorkCertDisruptor} from "./distrubtors/WorkCertDisruptor";
import {ConvocationDisruptor} from "./distrubtors/ConvocationDisruptor";
import {TicketDisruptor} from "./distrubtors/TicketDisruptor";
import {HealthDocDisruptor} from "./distrubtors/HealthDocDisruptor";


export class ContextMasterDisruptor {
    private readonly disruptors: ContextDisruptor[];

    constructor() {
        this.disruptors = [];

        // GLOBALLY DISRUPTORS
        this.disruptors.push(new FakeSignatureDisruptor(0.02));
        this.disruptors.push(new IdCardDisruptor(0.05, 0.05));
        this.disruptors.push(new AttestationDisruptor(0.08, 0.07, 0.1));

        // SPECIFIC DISRUPTORS
        this.disruptors.push(new WorkCertDisruptor(0.2, 0.1));
        this.disruptors.push(new ConvocationDisruptor(0.06, 0.1, 0.05));
        this.disruptors.push(new TicketDisruptor(0.05, 0.05));
        this.disruptors.push(new HealthDocDisruptor(0.05, 0.05));
    }

    disturb(context: Context): FinalContext {
        const disruptions: DisruptionDescription[] = [];

        this.disruptors.forEach(disruptor => {
            const result = disruptor.disturb(context);
            if (result.length) disruptions.push(...result);
        });

        return {
            context: context,
            disruptionsDone : disruptions,
            punishable: disruptions.filter(d => d.punishable)
        };
    }
}