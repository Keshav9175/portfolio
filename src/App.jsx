import React, { Suspense, lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import DesktopOnly from "./components/DesktopOnly"; // ✅ ONLY ADDITION

// Lazy pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Project"));
const Connect = lazy(() => import("./pages/Connect"));
const SingleProject = lazy(() =>
  import("./components/Projects/SingleProject")
);

// Immediate components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";

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
