import {FakeSignatureDisruptor} from "./distrubtors/FakeSignatureDisruptor";
import {DisruptionDescription} from "../data/DisruptionDescription";
import {Context} from "../data/Context";
import {FinalContext} from "../data/FinalContext";
import ContextDisruptor from "./ContextDisruptor";
import {IdCardDisruptor} from "./distrubtors/IdCardDisruptor";


export class ContextMasterDisruptor {
    private readonly disruptors: ContextDisruptor[];

    constructor() {
        this.disruptors = [];

        this.disruptors.push(new FakeSignatureDisruptor(0.1));
        this.disruptors.push(new IdCardDisruptor(0.1, 0.1));
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