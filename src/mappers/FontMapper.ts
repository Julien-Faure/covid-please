export class FontMapper {
    private static readonly fonts = [
        "Cavalhatriz",
        "KiwiSoda",
        "DoubleHomicide",
        "GrapeSoda",
        "VNPxCopperplate",
    ];

    static getFont(id : number) : string {
        if(id >= this.getFontCount())
            throw new Error("Font id out of range");
        return this.fonts[id];
    }

    static getFontCount() : number {
        return this.fonts.length;
    }
}