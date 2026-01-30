import { ImageSource, Loader } from "excalibur";

// It is convenient to put your resources in one place
export const Resources = {
  Sword: new ImageSource("./images/sword.png"),
  Street: new ImageSource("./images/Street_v0.jpg"),
  Preview: new ImageSource("./images/Preview_v0.jpg"),
  Desk: new ImageSource("./images/Desk_v0.jpg"),
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
