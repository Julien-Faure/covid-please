
import * as ex from "excalibur";
import {View} from "../views/View";
import {Vector} from "excalibur";
import {playSoundDocDown} from "../sound/SoundPlayer";

type DragOptions = {
    bringToFront?: boolean;
    clampToScreen?: boolean;
};

/**
 * Attaches drag-and-drop behavior to an Actor.
 */
export class Draggable {
    private static drawables: Draggable[] = [];

    private dragging = false;
    private pointerOffset = ex.vec(0, 0);
    private readonly bringToFront: boolean;
    private readonly clampToScreen: boolean;

    constructor(
        private actor: ex.Actor,
        private scene: View,
        options: DragOptions = {}
    ) {
        this.bringToFront = options.bringToFront ?? true;
        this.clampToScreen = options.clampToScreen ?? false;

        this.init();
        Draggable.drawables.push(this);
    }

    private screenToRelativeToView(screenPos: ex.Vector): ex.Vector {
        return new Vector(this.scene.getPosition().x + screenPos.x, this.scene.getPosition().y + screenPos.y);
    }

    private init() {
        this.actor.on("pointerdown", this.onPointerDown);
        this.actor.on("pointermove", this.onPointerMove);
        this.actor.on("pointerup", this.onPointerUp);
        this.actor.on("pointerenter", this.onPointerEnter);
        this.actor.on("pointerleave", this.onPointerLeave);
    }

    public detach() {
        this.actor.off("pointerdown", this.onPointerDown);
        this.actor.off("pointermove", this.onPointerMove);
        this.actor.off("pointerup", this.onPointerUp);
        this.actor.off("pointerenter", this.onPointerEnter);
        this.actor.off("pointerleave", this.onPointerLeave);
    }

    public stopDragging() {
        if (this.dragging) {
            this.dragging = false;

            if (this.bringToFront) {
                this.actor.z = (this.actor.z ?? 0) - 10;
            }
            this.toTheTop();
        }
    }

    private onPointerDown = (evt: ex.PointerEvent) => {
        if (this.isOnTheTop(evt.screenPos)){
            this.dragging = true;

            if (this.bringToFront) {
                this.actor.z = (this.actor.z ?? 0) + 10;
            }

            const pointerWorld = this.screenToRelativeToView(evt.screenPos);
            this.pointerOffset = this.actor.pos.sub(pointerWorld);
        }
    };

    private onPointerMove = (evt: ex.PointerEvent) => {
        if (!this.dragging) return;

        const pointerWorld = this.screenToRelativeToView(evt.screenPos);
        const newPos = pointerWorld.add(this.pointerOffset);

        this.actor.pos = newPos;

        if (this.clampToScreen) {
            const topLeft = this.screenToRelativeToView(ex.vec(0, 0));
            const bottomRight = this.screenToRelativeToView(
                ex.vec(this.scene.getDimensions().width, this.scene.getDimensions().height)
            );

            this.actor.pos = ex.vec(
                ex.clamp(this.actor.pos.x, topLeft.x, bottomRight.x),
                ex.clamp(this.actor.pos.y, topLeft.y, bottomRight.y)
            );
        }
    };

    private onPointerUp = () => {
       this.stopDragging();
       playSoundDocDown();
    };

    private onPointerEnter = () => {
        document.body.style.cursor = 'pointer';
    };

    private onPointerLeave = () => {
        document.body.style.cursor = 'default';
    };

    private isOnTheTop(pos: Vector): boolean {
        const myZ = this.actor.z ?? 0;

        const drawablesAbove = Draggable.drawables.filter(d => {
            if (d === this) return false;

            const z = d.actor.z ?? 0;
            if (z <= myZ) return false;

            const left = d.actor.pos.x;
            const right = d.actor.pos.x + d.actor.width;
            const top = d.actor.pos.y;
            const bottom = d.actor.pos.y + d.actor.height;

            const inside =
                pos.x >= left && pos.x <= right &&
                pos.y >= top && pos.y <= bottom;

            return inside;
        });

        return drawablesAbove.length === 0;
    }

    private toTheTop() {
        const orderedByZ = Draggable.drawables.sort((a, b) => a.actor.z - b.actor.z);
        this.actor.z = orderedByZ[orderedByZ.length - 1].actor.z;
    }
}
