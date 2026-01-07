import { useEffect, useRef } from "react";
import { useGravity } from "./gravity";
import Matter from "matter-js";

export default function PhysicsPill({ bg, text, textColor }) {
    const ref = useRef(null);
    const bodyRef = useRef(null);
    const lastMouse = useRef({ x: 0, y: 0 });
    const lastTime = useRef(0);
    const { register } = useGravity();

    useEffect(() => {
        bodyRef.current = register(ref.current);
    }, []);

    const onMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const body = bodyRef.current;

        lastMouse.current = { x: e.clientX, y: e.clientY };
        lastTime.current = performance.now();

        const move = (ev) => {
            const now = performance.now();
            const dt = Math.max(now - lastTime.current, 16);

            const dx = ev.clientX - lastMouse.current.x;
            const dy = ev.clientY - lastMouse.current.y;

            // 👉 DIRECT FOLLOW (easy drag)
            Matter.Body.setPosition(body, {
                x: body.position.x + dx,
                y: body.position.y + dy,
            });

            // 👉 calculate velocity for throw
            Matter.Body.setVelocity(body, {
                x: (dx / dt) * 16,
                y: (dy / dt) * 16,
            });

            lastMouse.current = { x: ev.clientX, y: ev.clientY };
            lastTime.current = now;
        };

        const up = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
    };

    return (
        <div
            ref={ref}
            onMouseDown={onMouseDown}
            className="absolute left-0 top-0 rounded-full select-none will-change-transform"
            style={{
                backgroundColor: bg,
                cursor: "grab",
                transform: "translate(-1000px,-1000px)",
            }}
        >
            <div className="box-border flex items-center justify-center p-[42.08px]">
                <p
                    className={`font-['TWK_Everett:Medium',sans-serif] text-[30.859px] uppercase whitespace-nowrap ${textColor === "white" ? "text-white" : "text-black"
                        }`}
                >
                    {text}
                </p>
            </div>
        </div>
    );
}
