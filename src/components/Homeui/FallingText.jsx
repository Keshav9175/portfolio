import { Gravity } from "./Gravity";
import PhysicsPill from "./PhysicsPill";

const pillsData = [
  { bg: "#dfb5ff", text: "gRAPHICS DESIGN", textColor: "black" },
  { bg: "#ff4820", text: "lOGO DESIGN", textColor: "black" },
  { bg: "#330000", text: "web Development", textColor: "white" },
  { bg: "#33c791", text: "VIDEO EDITING", textColor: "black" },
  { bg: "#3a48ff", text: "NO CODE WEB", textColor: "white" },
  { bg: "#51cf01", text: "LOGO DESIGN", textColor: "black" },
  { bg: "#330000", text: "web Development", textColor: "white" },
  { bg: "#0d8dff", text: "UI UX DESIGN", textColor: "white" },
  { bg: "#ff4820", text: "lOGO DESIGN", textColor: "black" },
  { bg: "#3a48ff", text: "NO CODE WEB", textColor: "white" },
  { bg: "#ff9a00", text: "LOGO DESIGN", textColor: "black" },
  { bg: "#51cf01", text: "App Dev", textColor: "black" },
  { bg: "#dfb5ff", text: "Illustrator", textColor: "black" },
];

export default function FallingText() {
  return (
    <div className="w-full bg-[#faf4ec] overflow-hidden">
      <Gravity>
        <div className="relative h-[640px]">
          {pillsData.map((pill, index) => (
            <PhysicsPill key={index} {...pill} />
          ))}
        </div>
      </Gravity>
    </div>
  );
}
