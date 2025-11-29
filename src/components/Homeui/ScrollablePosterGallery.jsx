import React, { useState } from "react";
import { motion } from "framer-motion";

const variants = {
  center: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    zIndex: 10,
    opacity: 1,
    boxShadow: "0 50px 120px rgba(10,20,30,0.25)",
  },
  left: {
    x: "-100%",
    y: "18%", // Increased from 5% to 18% to drop it lower (creates the circle arc)
    rotate: -25, // Increased rotation to match the steeper curve
    scale: 1,
    zIndex: 5,
    opacity: 1,
    boxShadow: "0 28px 60px rgba(2,6,23,0.15)",
  },
  right: {
    x: "100%",
    y: "18%", // Increased from 5% to 18% to drop it lower (creates the circle arc)
    rotate: 25, // Increased rotation to match the steeper curve
    scale: 1,
    zIndex: 5,
    opacity: 1,
    boxShadow: "0 28px 60px rgba(2,6,23,0.15)",
  },
  hiddenLeft: {
    x: "-150%",
    y: "40%", // Push hidden items even lower to follow the arc
    rotate: -60,
    scale: 0.8,
    zIndex: 1,
    opacity: 0,
  },
  hiddenRight: {
    x: "150%",
    y: "40%", // Push hidden items even lower to follow the arc
    rotate: 60,
    scale: 0.8,
    zIndex: 1,
    opacity: 0,
  },
};

const transition = {
  type: "spring",
  stiffness: 180,
  damping: 25,
  mass: 1,
};

export default function Graphicspostershowcase() {
  // Using the new Abstract & Poster Art images
  const imgs = [
    "https://images.unsplash.com/photo-1572375992501-1b2f8a45a278?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
  ];

  const [index, setIndex] = useState(0);
  const frameSize = 380;

  const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const getPositionVariant = (imgIndex) => {
    const total = imgs.length;
    let distance = imgIndex - index;
    if (distance > total / 2) distance -= total;
    if (distance < -total / 2) distance += total;

    if (distance === 0) return "center";
    if (distance === -1) return "left";
    if (distance === 1) return "right";
    return distance < 0 ? "hiddenLeft" : "hiddenRight";
  };

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    const velocityThreshold = 200;

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      setIndex((prev) => wrap(0, imgs.length, prev + 1));
    }
    else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      setIndex((prev) => wrap(0, imgs.length, prev - 1));
    }
  };

  return (
    <section className="w-full bg-[#faf4ec] flex justify-center overflow-hidden select-none">
      <div className="max-w-[1250px] w-full py-20 flex flex-col items-center">
        <div className="mb-6">
          <div className="text-sm tracking-widest text-gray-700 uppercase">
            GRAPHICS WORK
          </div>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div
          className="relative w-full flex justify-center items-center"
          style={{ height: 600 }}
        >
          {/* DRAG PROXY */}
          <motion.div
            className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          />

          {/* IMAGES */}
          {imgs.map((imgSrc, i) => {
            const position = getPositionVariant(i);
            return (
              <motion.div
                key={i}
                className="absolute bg-white pointer-events-none"
                style={{
                  width: frameSize,
                  height: frameSize,
                  borderRadius: 32,
                  overflow: "hidden",
                  // Pivot point is at the bottom to help with the arc swing feel
                  transformOrigin: "50% 120%",
                }}
                initial={false}
                animate={position}
                variants={variants}
                transition={transition}
              >
                <img
                  src={imgSrc}
                  alt={`poster-${i}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 text-center pointer-events-none">
          <h2 className="text-4xl font-extrabold text-gray-700 tracking-tight uppercase">
            POSTER DESIGN
          </h2>
          <div className="mt-2 text-xs text-gray-500 uppercase">
            Swipe to rotate
          </div>
        </div>
      </div>
    </section>
  );
}