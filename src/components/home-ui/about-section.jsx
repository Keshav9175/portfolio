import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// TEXT (unchanged)
const text =
  "Keshav Divate is a passionate UI/ UX designer and developer who blends creativity with technology, crafting intuitive, engaging, and user-centered digital experiences through design and code.";

export default function SkillsAndAbout() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");
  const totalWords = words.length;

  // 🔹 ICONS STATE
  const [icons, setIcons] = useState([]);

  // 🔹 FETCH ICONS FROM FIRESTORE
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const docRef = doc(db, "icons", "b2Pl7McZvSffrLJKcXcX");
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();

          // EXACT FIELD NAME FROM FIRESTORE
          if (Array.isArray(data.skillicons)) {
            setIcons(data.skillicons);
          }
        }
      } catch (error) {
        console.error("Error fetching skill icons:", error);
      }
    };

    fetchIcons();
  }, []);

  return (
    <div className="w-full bg-[#FAF4EC]">
      <div className="w-full flex flex-col items-center px-[50px] py-[80px]">

        {/* ABOUT HEADING */}
        <p className="text-[20px] uppercase text-black font-medium font-[TWKEverett]">
          About me
        </p>

        {/* MAIN TEXT */}
        <p
          ref={container}
          className="
            w-full text-center mt-[60px]
            text-[48px] uppercase leading-[1.4]
            font-[TWKEverett] flex flex-wrap justify-center
          "
        >
          {words.map((word, i) => {
            const start = i / totalWords;
            const end = start + 1 / totalWords;
            const isUI = word === "UI/";

            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                hasNoMargin={isUI}
              >
                {word}
              </Word>
            );
          })}
        </p>

        {/* ICONS — UI UNCHANGED */}
        <div className="mt-[60px] w-full flex flex-wrap gap-[40px] justify-center items-center">
          {icons.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="skill-icon"
              className="w-[80px] h-[80px] object-contain"
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// WORD COMPONENT (unchanged)
const Word = ({ children, progress, range, hasNoMargin }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`relative inline-block font-extrabold text-black ${hasNoMargin ? "mr-0" : "mr-[0.25em]"
        }`}
    >
      {children}
    </motion.span>
  );
};
