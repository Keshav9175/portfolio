export default function DesktopOnly({ children }) {
    return (
        <>
            {/* DESKTOP */}
            <div className="hidden lg:block">{children}</div>

            {/* MOBILE MESSAGE */}
            <div className="fixed inset-0 z-[99999] flex lg:hidden items-center justify-center bg-black text-white px-6">
                <div className="text-center max-w-md">
                    <h1 className="text-3xl font-extrabold italic uppercase mb-4">
                        Desktop Only Experience
                    </h1>
                    <p className="text-lg opacity-80">
                        Please open this website on a desktop or laptop for the best experience.
                    </p>
                </div>
            </div>
        </>
    );
}
