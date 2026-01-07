import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path if needed

/* ------------------ ANIMATION CONFIG (UNCHANGED) ------------------ */

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
    y: "18%",
    rotate: -25,
    scale: 1,
    zIndex: 5,
    opacity: 1,
    boxShadow: "0 28px 60px rgba(2,6,23,0.15)",
  },
  right: {
    x: "100%",
    y: "18%",
    rotate: 25,
    scale: 1,
    zIndex: 5,
    opacity: 1,
    boxShadow: "0 28px 60px rgba(2,6,23,0.15)",
  },
  hiddenLeft: {
    x: "-150%",
    y: "40%",
    rotate: -60,
    scale: 0.8,
    zIndex: 1,
    opacity: 0,
  },
  hiddenRight: {
    x: "150%",
    y: "40%",
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

/* ------------------ COMPONENT ------------------ */

export default function Graphicspostershowcase() {
  const [imgs, setImgs] = useState([]); // 🔥 FROM FIRESTORE
  const [index, setIndex] = useState(0);
  const frameSize = 380;

  /* ---------- FETCH GRAPHICS IMAGES FROM FIRESTORE ---------- */
  useEffect(() => {
    const fetchGraphics = async () => {
      const q = query(collection(db, "graphics"), orderBy("order"));
      const snapshot = await getDocs(q);

      const imageUrls = snapshot.docs.map(
        (doc) => doc.data().imageUrl
      );

      setImgs(imageUrls);
    };

    fetchGraphics();
  }, []);

  /* ---------- UTILS ---------- */
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
    } else if (
      info.offset.x > threshold ||
      info.velocity.x > velocityThreshold
    ) {
      setIndex((prev) => wrap(0, imgs.length, prev - 1));
    }
  };

  /* ---------- SAFETY CHECK ---------- */
  if (!imgs.length) return null;

  return (
    <section className="w-full bg-[#faf4ec] flex justify-center overflow-hidden select-none">
      <div className="max-w-[1250px] w-full py-20 flex flex-col items-center">
        <div className="mb-6">
          <div className="text-[20px] uppercase text-black font-medium font-[TWKEverett]">
            GRAPHICS WORK
          </div>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div
          className="relative w-full flex justify-center items-center"
          style={{ height: 500 }}
        >
          {/* DRAG PROXY */}
          <motion.div
            className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          />

          {/* IMAGES FROM FIREBASE */}
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
                  transformOrigin: "50% 120%",
                }}
                initial={false}
                animate={position}
                variants={variants}
                transition={transition}
              >
                <img
                  src={imgSrc}
                  alt={`graphics-${i}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 text-center pointer-events-none">
          <h2 className="text-4xl text-black font-extrabold tracking-tight uppercase">
            POSTER DESIGN
          </h2>
          <div className="mt-2 text-xs text-black uppercase">
            Swipe to rotate
          </div>
        </div>
      </div>
    </section>
  );
}
