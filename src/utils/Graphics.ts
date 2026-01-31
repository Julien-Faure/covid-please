import {Font, Text} from "excalibur";


export function getText(text : string, font : string, size : number) : Text {
    return  new Text({
        text: text,
        font: new Font({
            size: size,
            family: font
        })
    });
}