import { Color, DisplayMode, Engine, FadeInOut } from "excalibur";
import { loader } from "./resources";
import { Level } from "./Level";
import {SCREEN_SIZE} from "./config/Settings";

// Goal is to keep main.ts small and just enough to configure the engine

const game = new Engine({
  width: SCREEN_SIZE.width, // Logical width and height in game pixels
  height: SCREEN_SIZE.height,
  displayMode: DisplayMode.FitScreen, // Display mode tells excalibur how to fill the window
  pixelArt: true, // pixelArt will turn on the correct settings to render pixel art without jaggies or shimmering artifacts
  scenes: {
    start: Level
  },
  suppressPlayButton: true,
  // physics: {
  //   solver: SolverStrategy.Realistic,
  //   substep: 5 // Sub step the physics simulation for more robust simulations
  // },
  // fixedUpdateTimestep: 16 // Turn on fixed update timestep when consistent physic simulation is important
});

game.start('start', { // name of the start scene 'start'
  loader, // Optional loader (but needed for loading images/sounds)
  inTransition: new FadeInOut({ // Optional in transition
    duration: 1000,
    direction: 'in',
    color: Color.ExcaliburBlue
  })
}).then(() => {
  // Do something after the game starts
});