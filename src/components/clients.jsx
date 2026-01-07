// Clients.jsx
import React from "react";
import { ImageWithFallback } from "./image-with-fallback";

// DEFAULT CLIENT DATA (Firebase URLs)
const defaultClients = [
    {
        id: 1,
        name: "Creative",
        logo: "https://firebasestorage.googleapis.com/v0/b/portfolio-keshav-93f5b.firebasestorage.app/o/project-images%2FClients%2Fcreative.svg?alt=media&token=c9cdf669-8120-4528-afb6-1dac366ef495",
    },
    {
        id: 2,
        name: "EZmix",
        logo: "https://firebasestorage.googleapis.com/v0/b/portfolio-keshav-93f5b.firebasestorage.app/o/project-images%2FClients%2Fezmix.png?alt=media&token=032f49e9-1bbb-4fe4-958e-572059af14ab",
    },
    {
        id: 3,
        name: "Snakiy",
        logo: "https://firebasestorage.googleapis.com/v0/b/portfolio-keshav-93f5b.firebasestorage.app/o/project-images%2FClients%2Fsnakiy.png?alt=media&token=6bb7d69b-07e8-4f87-8afd-f6ff0775b07a",
    },
    {
        id: 4,
        name: "WeFlex",
        logo: "https://firebasestorage.googleapis.com/v0/b/portfolio-keshav-93f5b.firebasestorage.app/o/project-images%2FClients%2Fweflex.svg?alt=media&token=9e22c46c-6525-4a8b-8f3a-cc53d56ef861",
    },
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
