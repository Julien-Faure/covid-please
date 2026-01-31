import {FontSource, ImageSource, Loader} from "excalibur";

// ******************************* Images ***************************************************

export const Resources = {
  Street: new ImageSource("./images/Street.jpg"),
  Preview: new ImageSource("./images/Preview.jpg"),
  Desk: new ImageSource("./images/Desk.jpg"),
  IDCard: new ImageSource("./images/IDCard.png"),
  Attestation: new ImageSource("./images/Attestation.png"),
  WorkCert: new ImageSource("./images/Work.png"),
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}


// ******************************* FONTS ***************************************************

const fonts = [
    new FontSource("./fonts/Cavalhatriz.ttf","Cavalhatriz"),
    new FontSource("./fonts/KiwiSoda.ttf","KiwiSoda"),
    new FontSource("./fonts/DoubleHomicide.ttf","DoubleHomicide"),
    new FontSource("./fonts/GrapeSoda.ttf","GrapeSoda"),
    new FontSource("./fonts/VNPxCopperplate.ttf","VNPxCopperplate"),
    new FontSource("./fonts/ARCADEPI.ttf","ARCADEPI"),
]

fonts.forEach(font => font.load());