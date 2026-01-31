import {ContextDisruptor} from "./ContextDisruptor";
import {FakeSignatureDisruptor} from "./distrubtors/FakeSignatureDisruptor";
import {DisruptionDescription} from "../data/DisruptionDescription";


export class ContextMasterDisruptor {
    private readonly disruptors: ContextDisruptor[];

    constructor() {
        this.disruptors = [];

        this.disruptors.push(new FakeSignatureDisruptor(0.1));
    }


    disturb(context: Context): FinalContext {
        const disruptions: DisruptionDescription[] = [];

        this.disruptors.forEach(disruptor => {
            const result = disruptor.disturb(context);
            if (result) disruptions.push(disruptions)
        });

        return {
            context: context,
            disruptions : disruptions,
            punishable: disruptions.length > 0
        };
    }
}