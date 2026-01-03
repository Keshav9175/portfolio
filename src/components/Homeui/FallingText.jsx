import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const FallingText = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pillRefs = useRef([]);

  // 1. Data Definition (Your visual style data)
  const pillsData = [
    { id: "p1", bg: "#dfb5ff", text: "gRAPHICS DESIGN", textColor: "black" },
    { id: "p2", bg: "#ff4820", text: "lOGO DESIGN", textColor: "black" },
    { id: "p3", bg: "#330000", text: "web Development", textColor: "white" },
    { id: "p4", bg: "#33c791", text: "VIDEO EDITING", textColor: "black" },
    { id: "p5", bg: "#3a48ff", text: "NO CODE WEB", textColor: "white" },
    { id: "p6", bg: "#51cf01", text: "LOGO DESIGN", textColor: "black" },
    { id: "p7", bg: "#330000", text: "web Development", textColor: "white" },
    { id: "p8", bg: "#0d8dff", text: "UI UX DESIGN", textColor: "white" },
    { id: "p9", bg: "#ff4820", text: "lOGO DESIGN", textColor: "black" },
    { id: "p10", bg: "#3a48ff", text: "NO CODE WEB", textColor: "white" },
    { id: "p11", bg: "#ff9a00", text: "LOGO DESIGN", textColor: "black" },
    // Added a few more to fill the space like the original video concept
    { id: "p12", bg: "#51cf01", text: "App Dev", textColor: "black" },
    { id: "p13", bg: "#dfb5ff", text: "Illustrator", textColor: "black" },
  ];

  useEffect(() => {
    // 2. Setup Matter.js Engine
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Runner = Matter.Runner;

    const engine = Engine.create();
    const world = engine.world;

    // Get container dimensions
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 3. Create Boundaries (Walls)
    const ground = Bodies.rectangle(width / 2, height + 50, width, 100, {
      isStatic: true,
      render: { visible: false },
    });
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, {
      isStatic: true,
      render: { visible: false },
    });
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 2, {
      isStatic: true,
      render: { visible: false },
    });

    World.add(world, [ground, leftWall, rightWall]);

    // 4. Create Bodies mapped to DOM elements
    const bodies = [];

    // We iterate over the DOM refs we collected to create matching physics bodies
    pillRefs.current.forEach((el, index) => {
      if (!el) return;

      // Measure the rendered DOM element
      const rect = el.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Randomize start positions slightly so they don't stack perfectly
      const x = Math.random() * (width - w) + w / 2;
      const y = -Math.random() * 500 - 100; // Start above the screen

      const body = Bodies.rectangle(x, y, w, h, {
        restitution: 0.6, // Bounciness
        friction: 0.1,
        render: { visible: false }, // Physics body is invisible, DOM element follows it
        chamfer: { radius: h / 2 }, // Makes physics body rounded matches CSS border-radius
      });

      // Link the body back to the DOM element for the update loop
      body.domElement = el;
      bodies.push(body);
    });

    World.add(world, bodies);

    // 5. Setup Mouse Interaction
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    // Disable Matter.js from capturing scroll and touch-drag for scrolling
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    // This allows the touch events to bubble up to the browser for scrolling
    mouse.element.removeEventListener("touchstart", mouse.touchstart);
    mouse.element.removeEventListener("touchmove", mouse.touchmove);
    mouse.element.removeEventListener("touchend", mouse.touchend);

    World.add(world, mouseConstraint);

    // 6. The Runner (Game Loop)
    // Instead of Matter.Render, we use a custom loop to update DOM positions
    const runner = Runner.create();
    Runner.run(runner, engine);

    const updateLoop = () => {
      bodies.forEach((body) => {
        if (body.domElement) {
          const { x, y } = body.position;
          const rotation = body.angle;

          // Apply physics calculations to the CSS transform
          body.domElement.style.transform = `translate(${x - body.domElement.offsetWidth / 2}px, ${y - body.domElement.offsetHeight / 2}px) rotate(${rotation}rad)`;
        }
      });
      requestAnimationFrame(updateLoop);
    };

    const animationId = requestAnimationFrame(updateLoop);

    // Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationId);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(world);
      // Determine if we need to remove event listeners (Matter handles most internal ones)
    };
  }, []);

  // Helper to store refs array
  const addToRefs = (el) => {
    if (el && !pillRefs.current.includes(el)) {
      pillRefs.current.push(el);
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#faf4ec]">
      <div
        ref={containerRef}
        className="w-full h-[640px] relative touch-pan-y cursor-grab active:cursor-grabbing"
      >
        {pillsData.map((pill) => {
          const textColorClass = pill.textColor === "white" ? "text-white" : "text-black";

          return (
            <div
              key={pill.id}
              ref={addToRefs}
              // ADD "rounded-full" HERE (This div has the background color)
              className="absolute left-0 top-0 select-none will-change-transform rounded-full"
              style={{
                backgroundColor: pill.bg,
                transform: 'translate(-1000px, -1000px)'
              }}
            >
              {/* Inner padding box */}
              <div className="box-border flex items-center justify-center p-[42.08px]">
                <p
                  className={`font-['TWK_Everett:Medium',sans-serif] leading-[normal] text-[30.859px] uppercase whitespace-nowrap ${textColorClass}`}
                >
                  {pill.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FallingText;