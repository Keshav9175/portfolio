import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const container = useRef(null);
    const text = "LOADING...";
    const charHeight = 180; // Matches font size

    useEffect(() => {
        // Prevent scrolling while loader is active
        const preventDefault = (e) => e.preventDefault();
        window.addEventListener('wheel', preventDefault, { passive: false });
        window.addEventListener('touchmove', preventDefault, { passive: false });
        
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const letters = container.current.querySelectorAll('.letter-inner');

        // Create an infinite timeline
        const tl = gsap.timeline({ repeat: -1 });

        // We loop through the colors: Yellow -> Blue -> Yellow -> Blue -> (Instant Reset)
        tl.to(letters, {
            y: -charHeight, // To 1st Blue
            duration: 0.8,
            ease: "power4.inOut",
            stagger: 0.1
        }, "+=0.2")
            .to(letters, {
                y: -charHeight * 2, // To 2nd Yellow
                duration: 0.8,
                ease: "power4.inOut",
                stagger: 0.1
            }, "+=0.2")
            .to(letters, {
                y: -charHeight * 3, // To 2nd Blue
                duration: 0.8,
                ease: "power4.inOut",
                stagger: 0.1
            }, "+=0.2")
            .to(letters, {
                y: -charHeight * 4, // To 3rd Yellow (Loop Point)
                duration: 0.8,
                ease: "power4.inOut",
                stagger: 0.1
            }, "+=0.2")
            .set(letters, { y: 0 }); // Instant jump back to start (invisible to the user)

        // Global Exit Timer
        const exitTimer = setTimeout(() => {
            gsap.to(container.current, {
                autoAlpha: 0,
                duration: 0.8,
                onComplete: () => {
                    window.removeEventListener('wheel', preventDefault);
                    window.removeEventListener('touchmove', preventDefault);
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    onComplete?.();
                }
            });
        }, 3500);

        return () => {
            tl.kill();
            clearTimeout(exitTimer);
            window.removeEventListener('wheel', preventDefault);
            window.removeEventListener('touchmove', preventDefault);
            document.body.style.overflow = ''; 
            document.documentElement.style.overflow = '';
        };
    }, [onComplete]);

    return (
        <div
            ref={container}
            className="fixed inset-0 flex items-center justify-center bg-[#faf4ec] z-[9999] overflow-hidden"
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@900&display=swap');
        
        .letter-window {
          height: ${charHeight}px; 
          overflow: hidden; 
          position: relative;
        }

        .letter-inner {
          display: flex;
          flex-direction: column;
          will-change: transform;
        }

        .char {
          height: ${charHeight}px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Montserrat Alternates', sans-serif;
          font-size: ${charHeight}px;
          font-weight: 900;
          line-height: 0.8; 
          padding: 0 4px;
          user-select: none;
        }
      `}</style>

            <div className="flex">
                {text.split("").map((char, i) => (
                    <div key={i} className="letter-window">
                        <div className="letter-inner">
                            {/* Stack: Y -> B -> Y -> B -> Y(Reset target) */}
                            <div className="char" style={{ color: '#FC2439' }}>{char}</div>
                            <div className="char" style={{ color: '#7A25F9' }}>{char}</div>
                            <div className="char" style={{ color: '#FC2439' }}>{char}</div>
                            <div className="char" style={{ color: '#7A25F9' }}>{char}</div>
                            <div className="char" style={{ color: '#FC2439' }}>{char}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 left-10 text-[12px] font-bold uppercase tracking-[0.3em] text-black opacity-40">
                KESHAV DIVATE PORTFOLIO
            </div>
        </div>
    );
};

export default Loader;