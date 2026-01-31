import {Context} from "../data/Context";

export interface ContextDisruptor {
    disturb(context: Context) : boolean;
}