import {Sound} from "excalibur"
import {Resources} from "../resources"
import {randomInt, randomRangedFloat} from "../utils/Random";
import {SCREEN_SIZE} from "../config/Settings";
import {Actor} from "excalibur";
import {Doc} from "../actors/Doc";
import {Sport} from "../actors/Sport";
import {IDCard} from "../actors/IDCard";
import {StudentCard} from "../actors/StudentCard";

export function startSounds():void
{
    Resources.AmbianceLoop.loop = true;
    Resources.AmbianceLoop.play();
    new Promise(async (resolve) => {
        setTimeout(resolve, randomInt(5000,45000));
    }).then(() => Resources.Party.play(0.6));
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
    }).then(() => Resources.Party.play(0.6));
}

export function playSoundPeopleStop(xPos:number):void
{
    playSound3D(Resources.PeopleStopL,Resources.PeopleStopR,xPos,0.8,0.3);
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
            Resources.Wrong1.play(0.6);
            break;
        case 2:
            Resources.Wrong2.play(0.6);
            break;
        case 1:
            Resources.Wrong3.play(0.6);
            break;
    }
}

export function playSoundTramBell(xPos:number, doubleBell:boolean = false): void
{
    if (doubleBell)
    {
        playSound3D(Resources.TramBell2L, Resources.TramBell2R, xPos, 0.9,0.2);
    }
    else
    {
        playSound3D(Resources.TramBell1L, Resources.TramBell1R, xPos, 0.9,0.2);
    }
}

export function playSoundDocDown(actor:Actor)
{
    console.log(actor);
    if (actor instanceof Doc || actor instanceof Sport)
    {
        playSound2D(Resources.PhoneDown,0.2,0.3,0.2)
    }
    else if (actor instanceof IDCard || actor instanceof StudentCard)
    {
        playSound2D(Resources.CardDown,0.85,0.3,0.3);
    }
    else
    {
        playSound2D(Resources.SheetDown,0.8,0.4,0.4);
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
