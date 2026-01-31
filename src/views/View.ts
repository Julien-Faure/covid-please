import {Vector} from "excalibur";

export interface View {

    init() : void;
    dispose() : void;
    getDimensions() : {width: number, height: number};
    getPosition() : Vector;
}