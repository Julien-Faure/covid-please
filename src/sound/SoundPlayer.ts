import {Sound} from "excalibur"
import {Resources} from "../resources"
import {randomInt, randomRangedFloat} from "../utils/Random";


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

export function playSoundPeopleStop():void
{
    playSound2D(Resources.PeopleStop,0.8,0.2,0.2);
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

export function playSoundTramBell(doubleBell:boolean = false): void
{

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

/*
function playSound3D(left: Sound, right: Sound, x:number,y:number, volume:number = 1)
{

}*/
