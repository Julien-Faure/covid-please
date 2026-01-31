import {Context} from "../data/Context";
import {DisruptionDescription} from "../data/DisruptionDescription";

export default interface ContextDisruptor {
    disturb(context: Context) : DisruptionDescription | undefined;
}