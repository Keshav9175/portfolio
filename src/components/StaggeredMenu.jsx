import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { gsap } from "gsap";
import logoSvg from "../assets/logo.svg";

/**
 * StaggeredMenu Component
 * -----------------------
 * A right-side animated menu that slides in using GSAP.
 * Colored layers (strips) animate first, followed by the white menu panel.
 * Menu items stagger animate inside the panel.
 *
 * Includes:
 * - GSAP entrance animation
 * - GSAP exit animation
 * - Exposed methods: menuRef.current.open(), .close(), .toggle()
 * - Fully customizable colors, items, social links
 */

const StaggeredMenu = forwardRef(
  (
    {
      position = "right", // menu opens from right (can switch to left)
      colors = ["#FF2B8A", "#A63BFF", "#FF5C23"], // color strip layers
      items = [], // menu items
      socialItems = [], // social links
      displaySocials = true,
      displayItemNumbering = false,
      accentColor = "#A63BFF"
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    // References for DOM elements
    const panelRef = useRef(null); // white sliding panel
    const preLayersRef = useRef(null); // colored animation strips
    const preLayerElsRef = useRef([]); // array: each colored strip element

    // GSAP timeline references
    const openTlRef = useRef(null);
    const closeTlRef = useRef(null);

    const busyRef = useRef(false); // prevents double-click animation spam

    /**
     * Initial positioning:
     * Move all layers + panel offscreen before animation starts.
     */
    useLayoutEffect(() => {
      const pre = preLayersRef.current;

      // grab each .sm-prelayer DOM element
      const layers = pre ? Array.from(pre.querySelectorAll(".sm-prelayer")) : [];
      preLayerElsRef.current = layers;

      const panel = panelRef.current;
      const offscreen = position === "left" ? -100 : 100;

      // slide all elements offscreen using GSAP
      gsap.set([...layers, panel], { xPercent: offscreen });
    }, [position]);

    /**
     * Build GSAP open animation timeline
     */
    const buildOpenTimeline = useCallback(() => {
      const panel = panelRef.current;
      const layers = preLayerElsRef.current || [];
      if (!panel) return null;

      // Kill any existing timelines to prevent conflicts
      openTlRef.current?.kill();
      closeTlRef.current?.kill();

      const tl = gsap.timeline({ paused: true });

      /**
       * 1. Animate the colored strips first
       */
      layers.forEach((el, i) => {
        tl.fromTo(
          el,
          { xPercent: position === "left" ? -120 : 120 },
          { xPercent: 0, duration: 0.55, ease: "power4.out" },
          i * 0.06 // small stagger delay
        );
      });

      const panelDelay = layers.length * 0.06 + 0.05;

      /**
       * 2. Slide in the white menu panel
       */
      tl.fromTo(
        panel,
        { xPercent: position === "left" ? -100 : 100 },
        { xPercent: 0, duration: 0.6, ease: "power4.out" },
        panelDelay
      );

      /**
       * 3. Animate menu item text
       */
      const labels = panel.querySelectorAll(".sm-panel-itemLabel");

      tl.fromTo(
        labels,
        { yPercent: 120, rotate: 6 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: "power4.out"
        },
        panelDelay + 0.2
      );

      /**
       * 4. Animate social links (bottom area)
       */
      const socials = panel.querySelectorAll(".sm-socials-link");

      tl.fromTo(
        socials,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: "power3.out"
        },
        panelDelay + 0.4
      );

      openTlRef.current = tl;
      return tl;
    }, [position]);

    /**
     * Trigger OPEN animation
     */
    const openMenu = useCallback(() => {
      if (busyRef.current) return; // prevent double-click glitch
      busyRef.current = true;

      const tl = buildOpenTimeline();
      if (!tl) return;

      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });

      tl.play(0);
    }, [buildOpenTimeline]);

    /**
     * Trigger CLOSE animation
     */
    const closeMenu = useCallback(() => {
      if (busyRef.current) return;
      busyRef.current = true;

      const panel = panelRef.current;
      const layers = preLayerElsRef.current;

      const all = [...layers, panel];
      const off = position === "left" ? -110 : 110;

      closeTlRef.current = gsap.to(all, {
        xPercent: off,
        duration: 0.32,
        ease: "power3.in",
        onComplete: () => {
          busyRef.current = false;
        }
      });
    }, [position]);

    /**
     * Expose PUBLIC methods for parent components:
     * menuRef.current.open()
     * menuRef.current.close()
     * menuRef.current.toggle()
     */
    useImperativeHandle(
      ref,
      () => ({
        toggle: () => {
          if (!open) {
            setOpen(true);
            openMenu();
          } else {
            setOpen(false);
            closeMenu();
          }
        },
        open: () => {
          if (!open) {
            setOpen(true);
            openMenu();
          }
        },
        close: () => {
          if (open) {
            setOpen(false);
            closeMenu();
          }
        }
      }),
      [open, openMenu, closeMenu]
    );

    /**
     * Local button click handler
     */
    const localToggle = () => {
      if (!open) {
        setOpen(true);
        openMenu();
      } else {
        setOpen(false);
        closeMenu();
      }
    };

    return (
      <div className="sm-container">
        {/* ================================================================== */}
        {/* COLOR STRIPS (BACKGROUND ANIMATION LAYERS)                        */}
        {/* ================================================================== */}
        <div ref={preLayersRef} className="sm-prelayers">
          {colors.map((c, i) => (
            <div key={i} className="sm-prelayer" style={{ background: c }} />
          ))}
        </div>

        {/* ================================================================== */}
        {/* MAIN WHITE PANEL                                                  */}
        {/* ================================================================== */}
        <aside ref={panelRef} className="sm-menu-panel">
          <div className="sm-menu-header">
            {/* --------------------------------------------------------------- */}
            {/* CLOSE BUTTON                                                   */}
            {/* --------------------------------------------------------------- */}
            {/* 
              This button triggers the localToggle(), which calls GSAP close
              animation and hides the panel.
              
              - Text is "CLOSE ✕"
              - It is positioned inside the menu header
              - Color is black for visibility
            */}
            <button onClick={localToggle} className="sm-close-btn">
              CLOSE ✕
            </button>
          </div>

          {/* MENU ITEMS */}
          <ul className="sm-menu-list">
            {items.map((item, i) => (
              <li key={i} className="sm-menu-item">
                <a className="sm-panel-itemLabel" href={item.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* SOCIAL LINKS */}
          {displaySocials && (
            <div className="sm-socials">
              {socialItems.map((s, i) => (
                <a key={i} href={s.link} className="sm-socials-link">
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </aside>

        {/* ================================================================== */}
        {/* INTERNAL STYLES                                                  */}
        {/* ================================================================== */}
        <style>
          {`
          /* ========= MAIN CONTAINER ======== */
          .sm-container {
            position: fixed;
            inset: 0;
            z-index: 9999;
            pointer-events: none;
          }

          /* ========= COLORED STRIPS ======== */
          .sm-prelayers {
            position: absolute;
            top: 0;
            right: 0;
            width: clamp(280px, 38vw, 420px);
            height: 100vh;
            pointer-events: none;
            display: flex;
            flex-direction: column;
          }

          .sm-prelayer {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
          }

          /* ========= WHITE PANEL MENU ======== */
          .sm-menu-panel {
            position: absolute;
            right: 0;
            top: 0;
            width: clamp(280px, 38vw, 420px);
            height: 100vh;
            background: #fff;
            padding: 20px 30px;
            overflow-y: auto;
            pointer-events: auto;
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
          }

          .sm-menu-header {
            display: flex;
            justify-content: flex-end;
          }

          /* ========= CLOSE BUTTON ======== */
          .sm-close-btn {
            background: none;
            border: none;
            font-size: 16px;
            cursor: pointer;
            font-weight: 600;
            color: #000;
          }

          /* ========= MENU ITEMS ======== */
          .sm-menu-list {
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 0;
            list-style: none;
          }

          .sm-panel-itemLabel {
            font-size: 3.2rem;
            font-weight: 800;
            text-decoration: none;
            color: #000;
            text-transform: uppercase;
            letter-spacing: -2px;
          }

          /* ========= SOCIAL LINKS ======== */
          .sm-socials {
            margin-top: auto;
            display: flex;
            gap: 15px;
            padding-top: 40px;
          }

          .sm-socials-link {
            text-decoration: none;
            color: #000;
            font-weight: 600;
          }
        `}
        </style>
      </div>
    );
  }
);

export default StaggeredMenu;
