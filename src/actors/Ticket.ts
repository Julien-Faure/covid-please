import {Actor, Engine, GraphicsGroup, Text, vec, Vector} from "excalibur";
import {ZIndex} from "../views/ZIndex";
import {TicketDto} from "../dto/TicketDto";
import {Resources} from "../resources";
import {getText} from "../utils/Graphics";


export class Ticket extends Actor {
    private readonly ticketDto: TicketDto;

    constructor(pos: Vector, ticketDto: TicketDto) {
        super({
            pos,
            anchor: vec(0, 0),
            width: 100,
            height: 300,
            z: ZIndex.next()
        });

        this.ticketDto = ticketDto;
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        const background = Resources.EmptyTicket.toSprite();

        const group = new GraphicsGroup({
            members: [
                {graphic: background, offset: vec(0, 0)},
                {graphic: this.aText(this.ticketDto.date), offset: vec(5, 53)},
                {graphic: this.aText(this.ticketDto.location), offset: vec(5, 68)}
            ]
        });

        this.graphics.use(group);
    }

    private aText(text : string) : Text {
        return getText(text, "ARCADEPI", 11);
    }
}