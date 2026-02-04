import {Sound} from "excalibur"
import {Resources} from "../resources"
import {randomInt, randomRangedFloat} from "../utils/Random";
import {SCREEN_SIZE} from "../config/Settings";


export function startSounds():void
{
    Resources.AmbianceLoop.loop = true;
    Resources.AmbianceLoop.play();
    new Promise(async (resolve) => {
        setTimeout(resolve, randomInt(5000,45000));
    }).then(() => Resources.Party.play());
}

export function gameOverSounds():void
{
    Resources.AmbianceLoop.pause();
    Resources.Party.stop();
}

export function restartSounds(): void
{
    Resources.AmbianceLoop.play();
    new Promise(async (resolve) => {
        setTimeout(resolve, randomInt(5000,45000));
    }).then(() => Resources.Party.play(0.3));
}

export function playSoundPeopleStop(xPos:number):void
{
    let vol: number = 0.8;
    let volRange: number = 0.2;
    let pitchRange: number = 0.2;
    playSound3D(Resources.PeopleStopL,Resources.PeopleStopR,xPos,vol,volRange, pitchRange);
}

export function playSoundAmmende():void
{
    playSound2D(Resources.Ammende);
}

export function playSoundLostLife(lives: number):void
{
    switch (lives)
    {
        case 3:
            Resources.Wrong1.play(0.7);
            break;
        case 2:
            Resources.Wrong2.play(0.7);
            break;
        case 1:
            Resources.Wrong3.play(0.7);
            break;
    }
}

export function playSoundTramBell(xPos:number, doubleBell:boolean = false): void
{
    if (doubleBell)
    {
        playSound3D(Resources.TramBell2L, Resources.TramBell2R, xPos, 1);
    }
    else
    {
        playSound3D(Resources.TramBell1L, Resources.TramBell1R, xPos, 1);
    }
}

function playSound2D(sound: Sound, volume: number = 1, volumeRandomRange: number = 0,pitchRandomRange: number = 0) : void
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


function playSound3D(left: Sound, right: Sound, x:number, volume: number = 1, volumeRandomRange: number = 0,pitchRandomRange: number = 0)
{
    playSound2D(left,(1 - x/SCREEN_SIZE.width) * volume * volume,volumeRandomRange,pitchRandomRange);
    playSound2D(right,(x/SCREEN_SIZE.width) * volume * volume,volumeRandomRange,pitchRandomRange);
}
