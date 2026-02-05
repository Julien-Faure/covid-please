export function randomBoolean(): boolean {
    return Math.random() < 0.5;
}

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNewInt(min: number, max: number, last: number): number
{
    let n = randomInt(min,max);
    if (n == last)
    {
        n++;
        if(n>= max)
        {
            return min;
        }
        return n;
    }
    else
    {
        return n;
    }
}

export function randomRangedFloat(center:number,range:number): number
{
    return (Math.random() * range - range/2) + center;
}