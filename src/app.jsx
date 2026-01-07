import React, { Suspense, lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/loader";
import DesktopOnly from "./components/desktop-only"; // ✅ ONLY ADDITION

// Lazy pages
const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Projects = lazy(() => import("./pages/project"));
const Connect = lazy(() => import("./pages/connect"));
const SingleProject = lazy(() =>
  import("./components/projects/single-project")
);

// Immediate components
import Header from "./components/header";
import Footer from "./components/footer";
import ScrollToTop from "./scroll-to-top";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* LOADER — UNTOUCHED */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* ⬇️ ONLY THIS IS NEW */}
      <DesktopOnly>
        <div
          className={`min-h-screen flex flex-col bg-black text-white transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"
            }`}
        >
          <ScrollToTop />
          <Header />

          <main className="flex-1">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/project" element={<Projects />} />
                <Route path="/connect" element={<Connect />} />
                <Route
                  path="/single-project/:id"
                  element={<SingleProject />}
                />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </DesktopOnly>
    </>
  );
}
