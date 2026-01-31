import {Context} from "./Context";
import {DisruptionDescription} from "./DisruptionDescription";


export interface FinalContext  {
    context: Context,
    punishable: boolean,
    disruptionsDone: DisruptionDescription[]
}