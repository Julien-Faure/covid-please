import {Font, Text} from "excalibur";


export function getText(text : string) : Text {
    return  new Text({
        text: text,
        font: new Font({
            size: 15,
            family: 'Times New Roman'
        })
    });
}