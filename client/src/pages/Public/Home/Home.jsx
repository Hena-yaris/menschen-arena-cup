import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicHome() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleLoaded = () => {
      vid.currentTime = 10; // skip first 10 seconds
    };

    vid.addEventListener("loadedmetadata", handleLoaded);

    return () => vid.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/champions_intro.mp4" type="video/mp4" />
      </video>

      {/* Blue Spotlight Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-900/40 to-black/90"></div>

      {/* HERO */}
      <div className="relative flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-wide drop-shadow-2xl">
          Menschen Football Tournament-2025
        </h1>

        <div className="mt-4 w-32 h-1 bg-blue-400 rounded-full shadow-[0_0_20px_#60a5fa]"></div>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
          Where legends rise. Where rivalries ignite. Where champions are born.
        </p>

        <button
          onClick={() => navigate("login")}
          className="mt-10 px-10 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold tracking-wide shadow-xl transition-all backdrop-blur-sm cursor-pointer"
        >
          Login / Signup
        </button>
      </div>

      {/* INTRO */}
      <section className="relative py-20 bg-black/70 backdrop-blur-sm text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Welcome to the Arena</h2>
        <p className="max-w-2xl mx-auto text-gray-300 leading-relaxed">
          This isn’t just football — it’s where campus legends spawn, Prepare
          your heart, your lungs, and possibly your WiFi — things are about to
          get loud, dramatic, and extremely competitive. If your adrenaline
          isn’t ready… it better start stretching. ⚡🔥
        </p>
      </section>

      {/* CARDS */}
      <section className="relative py-20 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Live Matches",
            desc: "Track real-time scores and thrilling match moments.",
          },
          {
            title: "Register Your Team",
            desc: "Sign up and compete for the ultimate campus title.",
          },
          {
            title: "ትንበያ",
            desc: "የጨዋታውን ውጤት ትንበያ አድርጉ፣ ውጤት ሰብስቡ፣ ብዙ ውጤት የያዘ at the end 200birr!",
            special: true,
          },

          {
            title: "Fixtures & Results",
            desc: "Every match, every group, every knockout — all here.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`rounded-xl p-6 backdrop-blur-md transition-all hover:-translate-y-1
    ${
      card.special
        ? "bg-gradient-to-br from-yellow-500/30 to-orange-600/20 border border-yellow-400/40 shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:shadow-[0_0_45px_rgba(251,191,36,0.6)]"
        : "bg-gradient-to-br from-blue-900/40 to-black/40 border border-blue-500/20 shadow-[0_0_20px_rgba(96,165,250,0.2)] hover:shadow-[0_0_35px_rgba(96,165,250,0.35)]"
    }`}
          >
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-300 text-sm">{card.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
