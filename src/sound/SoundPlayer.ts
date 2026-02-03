import {Sound} from "excalibur"
import {randomRangedFloat} from "../utils/Random";

export function playSound2D(sound: Sound, volume: number = 1, volumeRandomRange: number = 0,pitchRandomRange: number = 0) : void
{
    let vol = randomRangedFloat(volume,volumeRandomRange);
    let rate = randomRangedFloat(0,pitchRandomRange);
    if (rate < 0){
        rate = rate / 2;
    }
    rate += 1;
    sound.playbackRate = rate;
    sound.play(vol);
}