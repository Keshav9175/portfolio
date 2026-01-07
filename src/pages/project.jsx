import React from "react";
import ProjectSection from "../components/projects/project-section";
import Clients from "../components/clients";

export default function Project() {
  return (
    <>
      {/* Hide scrollbars for this page only */}
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari, Edge */
          .page-no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for Firefox */
          .page-no-scrollbar {
            scrollbar-width: none;
          }

          /* Prevent default scrollbar space */
          .page-no-scrollbar {
            -ms-overflow-style: none;
            overflow-x: hidden;
          }
        `}
      </style>

      {/* Apply scrollbar hiding */}
      <div className="page-no-scrollbar w-full h-full overflow-hidden">
        <ProjectSection />
        <Clients />
      </div>
    </>
  );
}
