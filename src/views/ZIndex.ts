
export class ZIndex {
    static index = 1;

    static next() : number {
        return this.index++;
    }
}