import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

// --- Pill Definition based on user's image colors and text ---
const basePills = [
  // { text, background color, text color, estimated minimum pixel width }
  { text: "LOGO DESIGN", bg: "#FF9B2E", color: "#000", minW: 180 },
  { text: "UI UX DESIGN", bg: "#0E84FF", color: "#fff", minW: 180 },
  { text: "GRAPHICS DESIGN", bg: "#E6C2FF", color: "#000", minW: 240 },
  { text: "NO CODE WEB", bg: "#3E45FF", color: "#fff", minW: 180 },
  { text: "WEB DEVELOPMENT", bg: "#2FD400", color: "#000", minW: 280 },
  { text: "VIDEO EDITING", bg: "#4BC7A4", color: "#000", minW: 220 },
  { text: "UI UX DESIGN", bg: "#1096FF", color: "#fff", minW: 180 },
  { text: "LOGO DESIGN", bg: "#FF5A3C", color: "#000", minW: 180 },
  { text: "WEB DEVELOPMENT", bg: "#310707", color: "#fff", minW: 280 },
  { text: "LOGO DESIGN", bg: "#22C400", color: "#000", minW: 180 },
  { text: "NO CODE WEB", bg: "#3E45FF", color: "#fff", minW: 180 },
  { text: "LOGO DESIGN", bg: "#FF4E3B", color: "#000", minW: 180 }
];

// Repeats the base list to generate more pills for better clustering
const makePills = (repeat = 3) => {
  const arr = [];
  let id = 0;
  for (let r = 0; r < repeat; r++) {
    basePills.forEach((p) => {
      // Add a unique ID for Matter.js mapping and React keys
      arr.push({ ...p, id: id++, text: p.text + (r ? ` ${r}` : "") });
    });
  }
  return arr;
};

const FallingText = ({
  pills = makePills(3),
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  // Geometry & layout
  pillHeight = 88, // Larger height for the pill shape
  containerWidthMode = "100%",
  bottomPadding = 120 // Space below where pills land
}) => {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const pillRefs = useRef({}); // Use object for mapping to unique pill IDs
  const [started, setStarted] = useState(false);
  const [isMeasuring, setIsMeasuring] = useState(true);

  // Pill Renderer Component (used for initial measurement and final rendering)
  const Pill = ({ p, i }) => (
    <div
      ref={(el) => (pillRefs.current[p.id] = el)}
      style={{
        position: "absolute",
        // Initial measurement position (will be overridden by physics)
        left: "50%",
        top: `${-100 + (i % 6) * 5}px`, 
        // Style to match the image: big, rounded, shadow
        minWidth: p.minW || 200,
        height: pillHeight,
        lineHeight: `${pillHeight}px`,
        padding: "0 34px",
        borderRadius: pillHeight / 2,
        background: p.bg,
        color: p.color,
        fontWeight: 900,
        fontSize: 18,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
        transform: "translate(-50%,-50%)",
        zIndex: 3,
        pointerEvents: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
        textAlign: "center",
        // Control visibility: only visible during initial measurement or when controlled by physics
        opacity: started ? 1 : (isMeasuring ? 0.01 : 0),
        transition: "opacity 0.5s",
      }}
    >
      {p.text}
    </div>
  );

  // Trigger logic
  useEffect(() => {
    if (trigger === "auto") {
      // Small delay to ensure the DOM is ready for measurement
      const timeoutId = setTimeout(() => setStarted(true), 100); 
      return () => clearTimeout(timeoutId);
    }
  }, [trigger]);

  // Matter.js Setup and Physics Simulation
  useEffect(() => {
    if (!started) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Runner = Matter.Runner,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events,
      Body = Matter.Body;

    const container = containerRef.current;
    if (!container) return;

    // Set container dimensions
    let width = container.clientWidth;
    // Calculate height based on container content plus padding
    let height = container.clientHeight; 

    const engine = Engine.create();
    engine.world.gravity.y = gravity;
    engine.timing.timeScale = 1; // Normal speed

    // Setup Renderer
    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
        pixelRatio: window.devicePixelRatio || 1
      }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
    
    // --- 1. Boundaries ---
    const floorThickness = 100;
    // The floor is placed such that its TOP edge is exactly at the container's height minus the bottomPadding
    const floorY = height - bottomPadding + floorThickness / 2;

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent', visible: wireframes },
      restitution: 0.2, // Small bounce
      friction: 0.1,
    };
    
    const floor = Bodies.rectangle(width / 2, floorY, width + 100, floorThickness, boundaryOptions);
    const leftWall = Bodies.rectangle(-500, height / 2, 1000, height + 2000, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 500, height / 2, 1000, height + 2000, boundaryOptions);
    World.add(engine.world, [floor, leftWall, rightWall]);

    // --- 2. Create Pill Bodies ---
    const pillBodies = [];
    const elements = Object.values(pillRefs.current).filter(Boolean);
    
    // Process pills after initial measurement
    elements.forEach((el) => {
      const r = el.getBoundingClientRect();
      const w = r.width;
      const h = r.height;

      // Random spawn position X (within container bounds)
      const minX = w / 2 + 10;
      const maxX = width - w / 2 - 10;
      const x = Math.random() * (maxX - minX) + minX;

      // Random spawn position Y (start above the visible screen)
      const y = Math.random() * -200 - 50; 

      const body = Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: Math.round(h / 2) },
        density: 0.003,
        friction: 0.06,
        restitution: 0.6,
        frictionAir: 0.02,
        render: { visible: false } // We use the HTML elements for rendering
      });

      // Small initial velocity/spin for variety
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.12);
      World.add(engine.world, body);

      // Prepare DOM element for physics control
      el.style.position = "absolute";
      el.style.pointerEvents = "auto";
      pillBodies.push({ body, el });
    });
    
    // Set measurement complete, allowing opacity transition
    setIsMeasuring(false);

    // --- 3. Synchronization Loop (Matter.js Event) ---
    const syncElements = () => {
      pillBodies.forEach(({ body, el }) => {
        const { x, y } = body.position;
        // Apply position and rotation to DOM element
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.transform = `translate(-50%,-50%) rotate(${body.angle}rad)`;
      });
    };
    
    // Use Matter.js event listener for rock-solid synchronization
    Events.on(engine, "afterUpdate", syncElements);

    // --- 4. Mouse Interaction ---
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } }
    });
    World.add(engine.world, mouseConstraint);

    // --- 5. Resize Listener ---
    const onResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      // Update render canvas size
      const dpr = window.devicePixelRatio || 1;
      render.canvas.width = newWidth * dpr;
      render.canvas.height = newHeight * dpr;
      render.canvas.style.width = "100%";
      render.canvas.style.height = "100%";
      render.options.width = newWidth;
      render.options.height = newHeight;

      // Reposition walls and floor
      const newFloorY = newHeight - bottomPadding + floorThickness / 2;
      Body.setPosition(floor, { x: newWidth / 2, y: newFloorY });
      Body.setPosition(leftWall, { x: -500, y: newHeight / 2 });
      Body.setPosition(rightWall, { x: newWidth + 500, y: newHeight / 2 });

      width = newWidth;
      height = newHeight;
    };
    window.addEventListener("resize", onResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", onResize);
      Events.off(engine, "afterUpdate", syncElements);
      try { Render.stop(render); } catch (e) {}
      try { Runner.stop(runner); } catch (e) {}
      World.clear(engine.world, false);
      Engine.clear(engine);
      try {
        const cCanvas = canvasContainerRef.current && canvasContainerRef.current.querySelector("canvas");
        if (cCanvas && cCanvas.parentNode === canvasContainerRef.current) cCanvas.remove();
      } catch (e) {}
    };
  }, [started, pills, gravity, mouseConstraintStiffness, pillHeight, containerWidthMode, bottomPadding]);

  // Handle manual triggers
  const handleTrigger = () => {
    if (!started) setStarted(true);
  };

  return (
    <section
      ref={containerRef}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
      style={{
        position: "relative",
        width: containerWidthMode === "100vw" ? "100vw" : "100%",
        minHeight: 420,
        height: "80vh",
        paddingTop: 24,
        paddingBottom: `${bottomPadding}px`,
        overflow: "visible",
        cursor: started ? "grab" : (trigger === 'hover' ? 'pointer' : 'default'),
        // Ensure no external borders/shadows interfere with physics calculations
        background: "transparent",
        border: "none",
        boxShadow: "none",
      }}
      aria-label="Interactive falling pills area"
    >
      {/* Pills wrapper (pointerEvents none is critical before physics starts) */}
      <div style={{ position: "relative", width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }}>
        {pills.map((p, i) => (
          <Pill key={p.id} p={p} i={i} />
        ))}
      </div>

      {/* Canvas container for Matter.js rendering (receives pointer events for drag) */}
      <div
        ref={canvasContainerRef}
        style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "auto" }}
      />
    </section>
  );
};

// --- Main Application Wrapper to demonstrate usage ---
const App = () => {
    // Customization properties
    const physicsProps = {
        gravity: 0.9,
        mouseConstraintStiffness: 0.05,
        wireframes: false, // Set to true to see the physics bodies/walls
        bottomPadding: 160, // Increased bottom padding for visual space below the final pile
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center font-sans">
            <div className="w-full max-w-[1000px] bg-neutral-100 rounded-3xl shadow-xl p-0 overflow-hidden">
                <div className="p-8 sm:p-12">
                    <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
                        Interactive Skill Cloud
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        The pills will fall and cluster inside the section. You can drag and toss them around!
                    </p>
                </div>
                {/* The FallingText component itself */}
                <FallingText
                    pills={makePills(4)} // Use 4 repeats for a dense cluster
                    {...physicsProps}
                />
            </div>
        </div>
    );
};

export default App;
