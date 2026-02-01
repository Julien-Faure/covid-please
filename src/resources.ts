import {FontSource, ImageSource, Loader} from "excalibur";

// ******************************* Images ***************************************************

export const Resources = {
    StreetBG: new ImageSource("./images/Street_Background.png"),
    StreetFG: new ImageSource("./images/Street_Foreground.png"),
    StreetFountain: new ImageSource("./images/Street_fountain.png"),
    Preview: new ImageSource("./images/Preview.jpg"),
    Desk: new ImageSource("./images/Desk.jpg"),
    IDCard: new ImageSource("./images/IDCard.png"),
    Attestation: new ImageSource("./images/Attestation.png"),
    WorkCert: new ImageSource("./images/Work.png"),
    HeartFull: new ImageSource("./images/heart_full.png"),
    HeartEmpty: new ImageSource("./images/heart_empty.png"),
    Tram1: new ImageSource("./images/Tram_L1.png"),
    Tram2: new ImageSource("./images/Tram_L2.png"),
    TramBlack: new ImageSource("./images/Tram_Black.png"),
    EmptyConvocation: new ImageSource("./images/Convocation.png")
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
    loader.addResource(res);
}


// ******************************* FONTS ***************************************************

const fonts = [
    new FontSource("./fonts/Cavalhatriz.ttf", "Cavalhatriz"),
    new FontSource("./fonts/KiwiSoda.ttf", "KiwiSoda"),
    new FontSource("./fonts/DoubleHomicide.ttf", "DoubleHomicide"),
    new FontSource("./fonts/GrapeSoda.ttf", "GrapeSoda"),
    new FontSource("./fonts/VNPxCopperplate.ttf", "VNPxCopperplate"),
    new FontSource("./fonts/ARCADEPI.ttf", "ARCADEPI"),
]

fonts.forEach(font => font.load());