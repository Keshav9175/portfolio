import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiArrowUpRight } from "react-icons/fi";


// SVG Paths integrated directly from your source
const paths = {
    p14dc2b00: "M23.0453 2.46198L15.4205 27.6459L8.68232 27.6458L16.5453 2.46203L23.0453 2.46198Z",
    p214d7500: "M17.1761 4.24268H19.9362L13.9061 11.0201L21 20.2427H15.4456L11.0951 14.6493L6.11723 20.2427H3.35544L9.80517 12.9935L3 4.24268H8.69545L12.6279 9.3553L17.1761 4.24268ZM16.2073 18.6181H17.7368L7.86441 5.78196H6.2232L16.2073 18.6181Z",
    p2b170900: "M4.5 3.24268C3.67157 3.24268 3 3.91425 3 4.74268V19.7427C3 20.5711 3.67157 21.2427 4.5 21.2427H19.5C20.3284 21.2427 21 20.5711 21 19.7427V4.74268C21 3.91425 20.3284 3.24268 19.5 3.24268H4.5ZM8.52076 7.2454C8.52639 8.20165 7.81061 8.79087 6.96123 8.78665C6.16107 8.78243 5.46357 8.1454 5.46779 7.24681C5.47201 6.40165 6.13998 5.72243 7.00764 5.74212C7.88795 5.76181 8.52639 6.40728 8.52076 7.2454ZM12.2797 10.0044H9.75971H9.7583V18.5643H12.4217V18.3646C12.4217 17.9847 12.4214 17.6047 12.4211 17.2246C12.4203 16.2108 12.4194 15.1959 12.4246 14.1824C12.426 13.9363 12.4372 13.6804 12.5005 13.4455C12.7381 12.568 13.5271 12.0013 14.4074 12.1406C14.9727 12.2291 15.3467 12.5568 15.5042 13.0898C15.6013 13.423 15.6449 13.7816 15.6491 14.129C15.6605 15.1766 15.6589 16.2242 15.6573 17.2719C15.6567 17.6417 15.6561 18.0117 15.6561 18.3815V18.5629H18.328V18.3576C18.328 17.9056 18.3278 17.4537 18.3275 17.0018C18.327 15.8723 18.3264 14.7428 18.3294 13.6129C18.3308 13.1024 18.276 12.599 18.1508 12.1054C17.9638 11.3713 17.5771 10.7638 16.9485 10.3251C16.5027 10.0129 16.0133 9.81178 15.4663 9.78928C15.404 9.78669 15.3412 9.7833 15.2781 9.77989C14.9984 9.76477 14.7141 9.74941 14.4467 9.80334C13.6817 9.95662 13.0096 10.3068 12.5019 10.9241C12.4429 10.9949 12.3852 11.0668 12.2991 11.1741L12.2797 11.1984V10.0044ZM5.68164 18.5671H8.33242V10.01H5.68164V18.5671Z",
    p6b27700: "M17.4038 2.46198L9.779 27.6459L3.04084 27.6458L10.9038 2.46203L17.4038 2.46198Z",
    p9948500: "M6.00005 19L19 5.99996M19 5.99996V18.48M19 5.99996H6.52005",
};

export default function SingleProject() {
    const stripeColors = ['#7a25f9', '#b826fc', '#ff26ea', '#ff4820', '#fe7524', '#fedc29'];
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, "projects", id);
                console.log("Fetching project with ID:", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProject(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#faf4ec] text-black">Loading...</div>;
    }

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center bg-[#faf4ec] text-black">Project not found (ID: {id})</div>;
    }

    // Use fetched data or fallbacks
    const heroImage = project.thumbnail || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1200";
    const title = project.title || "Untitled Project";
    const visitLink = project.liveUrl || "#";
    const description = project.fullDesc || "No description available.";
    const screens = (project.images || []).filter(img => img);

    return (
        <div className="bg-[#faf4ec] flex flex-col items-center w-full min-h-screen overflow-x-hidden">


            {/* HERO SECTION */}
            <section className="relative w-full flex flex-col items-center justify-center py-[80px] px-[50px]">
                {/* Background Gradient Decoration */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                    <div className="absolute flex h-[452px] w-[1700px] left-[-133px] top-[123px] items-center justify-center rotate-[350deg] skew-x-[354deg] blur-[50px] opacity-40">
                        <div className="flex flex-col w-full h-[154px]">
                            {stripeColors.map((c, i) => <div key={i} className="h-[26px] w-full" style={{ backgroundColor: c }} />)}
                        </div>
                    </div>
                </div>

                <div className="w-[904px] h-[509px] rounded-[50px] overflow-hidden shadow-2xl">
                    <img
                        src={heroImage}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* PROJECT INFO */}
            <section className="w-full px-[50px] py-[80px] border-b border-black/10">
                <div className="flex justify-between items-start gap-10 mb-8">
                    <h1 className="text-[70px] text-black font-black uppercase leading-tight max-w-4xl">
                        {title}
                    </h1>
                    <a
                        href={visitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#ff4820] flex gap-3 items-center px-6 py-4 rounded-2xl text-white uppercase font-bold shrink-0"
                    >
                        Visit Site
                        <div className="bg-white p-2 rounded-lg flex items-center justify-center">
                            <FiArrowUpRight size={24} className="text-black" />
                        </div>
                    </a>

                </div>
                <p className="text-[22px] font-medium leading-[34px] uppercase text-black max-w-6xl">
                    {description}
                </p>
            </section>

            {/* SCREENSHOTS GRID */}
            {screens.length > 0 && (
                <section className="w-full px-[50px] py-[80px] border-b border-black/10 text-center">
                    <h2 className="text-[32px]  text-black font-black uppercase mb-14">More Images</h2>
                    <div className="grid grid-cols-4 gap-10">
                        {screens.map((src, i) => (
                            <div key={i} className="h-[622px] rounded-3xl overflow-hidden bg-gray-200">
                                <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}