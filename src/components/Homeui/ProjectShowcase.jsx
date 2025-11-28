import React from "react";


export default function ProjectShowcase() {
  const ARROW_PATH = "M7 17L17 7M17 7H7M17 7V17";

  // cards data (replace image with your own later)
  const cards = [
    { id: 1, bg: "white", numberColor: "#64625e", buttonVariant: "red", image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=1600&q=80" },
    { id: 2, bg: "#dfb5ff", numberColor: "#c881ff", buttonVariant: "white", image: "https://images.unsplash.com/photo-1523475496153-3d6cc0c9d5b5?w=1600&q=80" },
    { id: 3, bg: "#33c791", numberColor: "#6dffca", buttonVariant: "white", image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600&q=80" },
    { id: 4, bg: "#0d8dff", numberColor: "#66b7ff", buttonVariant: "white", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1600&q=80" },
  ];

  return (
    <div className="bg-[#faf4ec] relative min-h-screen">
      <div className="flex flex-col items-center w-full">
        <div className="box-border flex flex-col gap-[60px] items-center px-[50px] py-[80px] w-full">
          <p className="font-[TWKEverett] font-medium text-[20px] uppercase text-black">
            wEB UI Project
          </p>

          {/* map cards */}
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className="h-[680px] relative rounded-[40px] w-full overflow-hidden"
              style={{ backgroundColor: card.bg }}
            >
              <div className="box-border flex flex-col gap-[10px] h-[680px] items-start p-[40px] w-full">
                {/* header row */}
                <div className="flex items-center justify-between w-full">
                  <div className="bg-[#faf4ec] box-border flex gap-[10px] items-center justify-center p-[20px] rounded-[10px]">
                    <p className="font-[TWKEverett] font-medium text-[20px] uppercase text-black whitespace-nowrap">
                      Project
                    </p>
                  </div>

                  <p
                    className="font-[Poppins] text-[80px] leading-none text-center whitespace-pre"
                    style={{ color: card.numberColor }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                </div>

                {/* content row */}
                <div className="flex gap-[60px] items-start w-full">
                  {/* left content */}
                  <div className="flex flex-col gap-[10px] items-start flex-1">
                    {/* Title */}
                    <p className="font-[Poppins] font-bold text-[120px] text-black whitespace-pre">
                      Snakiy
                    </p>

                    {/* Description */}
                    <div className="flex flex-col gap-[10px] items-start">
                      <p className="font-[Poppins] font-semibold text-[32px] text-black whitespace-pre">
                        Keshav Divate is a p
                      </p>

                      <p className="font-[Poppins] text-[28px] text-black" style={{ width: 638 }}>
                        <span className="text-[rgba(0,0,0,0.6)]">
                          assionate UI/UX designer and developer who blends creativity with technology, crafting intuitive, engaging, and user-centered digital experiences through design and code.
                        </span>
                      </p>

                      {/* Visit button */}
                      <div
                        className="inline-flex items-center gap-[12px] px-[20px] py-[12px] rounded-[14px]"
                        style={{ backgroundColor: card.buttonVariant === "red" ? "#ff4820" : "white" }}
                      >
                        <p
                          className="font-[TWKEverett] font-medium text-[20px] uppercase whitespace-nowrap"
                          style={{ color: card.buttonVariant === "red" ? "white" : "black" }}
                        >
                          vISIT nOW
                        </p>

                        <div
                          className="box-border flex items-center p-[10px] rounded-[10px]"
                          style={{ backgroundColor: card.buttonVariant === "red" ? "white" : "black" }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d={ARROW_PATH} stroke={card.buttonVariant === "red" ? "black" : "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* right image */}
                  <div className="flex-1 flex justify-center md:justify-end">
                    <div className="aspect-[1500/1125] relative rounded-[24px] w-full max-w-[720px] overflow-hidden">
                      <img
                        src={card.image}
                        alt={`project-${card.id}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-[24px]"
                      />
                    </div>
                  </div>
                </div>
                {/* end content row */}
              </div>
            </div>
          ))}
          {/* end map cards */}
        </div>
      </div>
    </div>
  );
}
