import { createContext, useContext, useEffect, useRef } from "react";
import Matter from "matter-js";

const GravityContext = createContext(null);
export const useGravity = () => useContext(GravityContext);

export function Gravity({ children }) {
    const containerRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const bodiesRef = useRef([]);
    const rafRef = useRef(null);

    useEffect(() => {
        const { Engine, World, Bodies, Runner } = Matter;

        const engine = engineRef.current;
        engine.gravity.y = 1;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        World.add(engine.world, [
            Bodies.rectangle(width / 2, height + 60, width, 120, { isStatic: true }),
            Bodies.rectangle(-60, height / 2, 120, height * 2, { isStatic: true }),
            Bodies.rectangle(width + 60, height / 2, 120, height * 2, { isStatic: true }),
        ]);

        const runner = Runner.create();
        Runner.run(runner, engine);

        const update = () => {
            bodiesRef.current.forEach(({ body, el }) => {
                el.style.transform = `
          translate(
            ${body.position.x - el.offsetWidth / 2}px,
            ${body.position.y - el.offsetHeight / 2}px
          )
          rotate(${body.angle}rad)
        `;
            });
            rafRef.current = requestAnimationFrame(update);
        };
        update();

        return () => {
            cancelAnimationFrame(rafRef.current);
            Runner.stop(runner);
            World.clear(engine.world);
            Engine.clear(engine);
        };
    }, []);

    const register = (el) => {
        const rect = el.getBoundingClientRect();

        const body = Matter.Bodies.rectangle(
            Math.random() * 700 + 100,
            -Math.random() * 600 - 100,
            rect.width,
            rect.height,
            {
                restitution: 0.55,
                friction: 0.01,
                frictionAir: 0.001,
                density: 0.001,
                chamfer: { radius: rect.height / 2 },
            }
        );

        bodiesRef.current.push({ body, el });
        Matter.World.add(engineRef.current.world, body);
        return body;
    };

    return (
        <GravityContext.Provider value={{ register }}>
            <div ref={containerRef} className="relative w-full h-full">
                {children}
            </div>
        </GravityContext.Provider>
    );
}
