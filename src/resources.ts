import { ImageSource, Loader } from "excalibur";

export const Resources = {
  Sword: new ImageSource("./images/sword.png"),
  Street: new ImageSource("./images/Street.jpg"),
  Preview: new ImageSource("./images/Preview.jpg"),
  Desk: new ImageSource("./images/Desk.jpg"),
  IDCard: new ImageSource("./images/IDCard.png"),
  Attestation: new ImageSource("./images/Attestation.jpg"),
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
