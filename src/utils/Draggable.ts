
import * as ex from "excalibur";
import {View} from "../views/View";
import {Vector} from "excalibur";

type DragOptions = {
    bringToFront?: boolean;
    clampToScreen?: boolean;
};

/**
 * Attaches drag-and-drop behavior to an Actor.
 */
export function makeDraggable(
    actor: ex.Actor,
    scene: View,
    options: DragOptions = {}
) {
    const { bringToFront = true, clampToScreen = false } = options;

    let dragging = false;
    let pointerOffset = ex.vec(0, 0);

    function screenToRelativeToView(screenPos: ex.Vector): ex.Vector {
        return new Vector(scene.getPosition().x + screenPos.x, scene.getPosition().y + screenPos.y);
    }

    actor.on("pointerdown", (evt: ex.PointerEvent) => {
        dragging = true;

        if (bringToFront) {
            actor.z = (actor.z ?? 0) + 10;
        }

        const pointerWorld = screenToRelativeToView(evt.screenPos);
        pointerOffset = actor.pos.sub(pointerWorld);
    });

    actor.on("pointermove", (evt: ex.PointerEvent) => {
        if (!dragging) return;

        const pointerWorld = screenToRelativeToView(evt.screenPos);
        const newPos = pointerWorld.add(pointerOffset);

        actor.pos = newPos;

        if (clampToScreen) {
            const topLeft = screenToRelativeToView(ex.vec(0, 0));
            const bottomRight = screenToRelativeToView(
                ex.vec(scene.getDimensions().width, scene.getDimensions().height)
            );

            actor.pos = ex.vec(
                ex.clamp(actor.pos.x, topLeft.x, bottomRight.x),
                ex.clamp(actor.pos.y, topLeft.y , bottomRight.y )
            );
        }
    });

    actor.on("pointerup", () => {
        dragging = false;
    });

    actor.on("pointerenter", ()=>{
        document.body.style.cursor = 'pointer';
    });
    actor.on("pointerleave", ()=>{
        document.body.style.cursor = 'default';
    });
}