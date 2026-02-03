export function randomBoolean(): boolean {
    return Math.random() < 0.5;
}

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomRangedFloat(center:number,range:number): number
{
    return (Math.random() * range - range/2) + center;
}