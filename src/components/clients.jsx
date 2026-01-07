// Clients.jsx
import React from "react";
import { ImageWithFallback } from "./image-with-fallback";

// IMPORT YOUR LOGOS
import creativeLogo from "../assets/clients/creative.svg";
import snakiyLogo from "../assets/clients/snakiy.png";
import weflexLogo from "../assets/clients/weflex.svg";
import ezmixLogo from "../assets/clients/ezmix.png";

// DEFAULT CLIENT DATA
const defaultClients = [
    { id: 1, name: "Creative", logo: creativeLogo },
    { id: 2, name: "Snakiy", logo: snakiyLogo },
    { id: 3, name: "WeFlex", logo: weflexLogo },
    { id: 4, name: "EZmix", logo: ezmixLogo },
];

export default function Clients({ clients = defaultClients }) {
    return (
        <section className="w-full bg-[#faf4ec] py-12" aria-label="Clients">
            <div className="flex flex-col w-[100%] md:px-[50px] 2xl:px-[100px] mx-auto px-6">

                <h3 className="text-center text-[20px] text-black font-['TWKEverett'] font-medium uppercase tracking-[1px] mb-8">
                    CLIENTS
                </h3>

                <div className="flex items-stretch justify-between gap-8">
                    {clients.map((c) => (
                        <div
                            key={c.id}
                            className="flex-1 max-w-[305px] min-w-[240px] h-[305px] rounded-[32px] bg-[#faf4ec] 
                         border border-[rgba(0,0,0,0.6)] flex items-center justify-center p-8"
                        >
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-full h-full rounded-[24px] flex items-center justify-center">
                                    <div className="w-[60%] h-[60%] flex items-center justify-center">
                                        <ImageWithFallback
                                            src={c.logo}
                                            alt={c.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
