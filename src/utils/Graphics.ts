import {Color, Font, Text} from "excalibur";


export function getText(text : string, font : string, size : number) : Text {
    return  new Text({
        text: text,
        font: new Font({
            size: size,
            family: font
        })
    });
}

export function getColoredText(text : string, font : string, size : number, color: Color) : Text {
    return  new Text({
        text: text,
        font: new Font({
            size: size,
            family: font,
            color: color
        })
    });
}