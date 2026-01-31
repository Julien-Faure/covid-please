import {Context} from "../data/Context";


export default interface ContextGenerator {
    generate() : Context;
}