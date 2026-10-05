/* Petal Postcard design reminder: the final page is a gentle birthday candle scene with an interactive
   blowable candle flame, wispy smoke animation, and a celestial Sky Lantern Wish ceremony for Beeba. */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, RotateCcw, Send, Sparkles, Wind } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import BirthdayShell from "@/components/BirthdayShell";
import { sound } from "@/lib/soundFx";

const presetWishes = [
  "Inner peace, gentle days, and boundless confidence.",
  "New adventures, wonderful memories, and big dreams realized.",
  "Radiant health, sincere people, and reasons to laugh every single day.",
  "A year as lovely, kind, and unforgettable as you are.",
];

export default function Wish() {
  const [, setLocation] = useLocation();
  const [candleBlown, setCandleBlown] = useState(false);
  const [customWish, setCustomWish] = useState("");
  const [selectedChip, setSelectedChip] = useState(0);
  const [lanternReleased, setLanternReleased] = useState(false);

  const handleBlowCandle = () => {
    if (candleBlown) return;
    sound.playBlowCandle();
    setCandleBlown(true);
  };

  const handleReleaseLantern = () => {
    sound.playLanternAscent();
    setLanternReleased(true);
  };

  const handleRelight = () => {
    sound.playChime(1.1);
    setCandleBlown(false);
    setLanternReleased(false);
  };

  const currentWishText = customWish.trim() || presetWishes[selectedChip];

  return (
    <BirthdayShell step={4} label="A wish for Beeba">
      <section className="screen wish-screen" aria-labelledby="wish-title">
        {/* Left column: Cake with Interactive Blowable Candle */}
        <motion.div
          className="wish-photo-wrap"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.48 }}
        >
          <div className="cake-display-frame">
            <img
              src="/media/pink-birthday-cake.jpg"
              alt="A strawberry-pink birthday cake with one lit candle"
            />

            {/* Interactive Candle Overlay */}
            <div className="candle-overlay-spot">
              <button
                className="candle-flame-btn"
                onClick={handleBlowCandle}
                disabled={candleBlown}
                aria-label={candleBlown ? "Candle is blown out" : "Blow out Beeba's birthday candle"}
              >
                {!candleBlown ? (
                  <svg className="candle-flame-svg" viewBox="0 0 100 140" fill="none">
                    <defs>
                      <radialGradient id="flameGrad" cx="50%" cy="65%" r="55%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="25%" stopColor="#FFF275" />
                        <stop offset="55%" stopColor="#FF8C00" />
                        <stop offset="85%" stopColor="#FF3B00" />
                        <stop offset="100%" stopColor="transparent" />
                      </radialGradient>
                    </defs>
                    <path
                      d="M50 0 C65 40 85 75 80 105 C75 130 55 140 50 140 C45 140 25 130 20 105 C15 75 35 40 50 0 Z"
                      fill="url(#flameGrad)"
                    />
                  </svg>
                ) : (
                  /* Animated rising wispy smoke */
                  <svg className="smoke-animation" viewBox="0 0 60 100" fill="none">
                    <path
                      d="M30 95 Q20 70 35 50 T30 10"
                      stroke="rgba(245, 240, 236, 0.75)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>

              {!candleBlown ? (
                <div className="blow-candle-prompt" onClick={handleBlowCandle}>
                  <Wind size={13} />
                  <span>Tap flame to blow candle</span>
                </div>
              ) : (
                <div className="blow-candle-prompt" style={{ borderColor: "#4caf50", color: "#a5d6a7" }}>
                  <Sparkles size={13} />
                  <span>Wish sealed! ✨</span>
                </div>
              )}
            </div>
          </div>

          <div className="cake-paper-note">
            <span>final chapter</span>
            <strong>one golden<br />wish</strong>
          </div>
        </motion.div>

        {/* Right column: Interactive Wish Ceremony */}
        <div className="wish-copy-page">
          <p className="chapter-label">
            <Sparkles size={13} /> final chapter · the ceremony
          </p>
          <h1 id="wish-title">
            Make a wish, <em>Beeba.</em>
          </h1>
          <p>
            {!candleBlown
              ? "Close your eyes, think of the brightest thing you want for this year, and blow out the candle."
              : "Your candle is blown! Now, release your secret wish into the stars."}
          </p>

          <AnimatePresence mode="wait">
            {!lanternReleased ? (
              <motion.div
                key="wish-form"
                className="sky-lantern-chamber"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="lantern-icon-wrap">
                  {/* Glowing Paper Lantern SVG */}
                  <svg className="lantern-svg" viewBox="0 0 80 100" fill="none">
                    <defs>
                      <radialGradient id="lanternGlow" cx="50%" cy="60%" r="60%">
                        <stop offset="0%" stopColor="#FFF2A7" />
                        <stop offset="60%" stopColor="#FFA726" />
                        <stop offset="100%" stopColor="#E65100" />
                      </radialGradient>
                    </defs>
                    <rect x="15" y="10" width="50" height="70" rx="8" fill="url(#lanternGlow)" />
                    <rect x="25" y="4" width="30" height="6" rx="3" fill="#D7CCC8" />
                    <rect x="25" y="80" width="30" height="5" rx="2" fill="#D7CCC8" />
                    <line x1="40" y1="85" x2="40" y2="98" stroke="#FFE082" strokeWidth="2" />
                    <circle cx="40" cy="55" r="9" fill="#FFFDE7" filter="drop-shadow(0 0 8px #FFEB3B)" />
                  </svg>
                </div>

                <h4 style={{ margin: "0 0 8px", fontFamily: "DM Serif Display, serif", fontSize: "1.3rem", color: "#fff" }}>
                  Celestial Sky Lantern
                </h4>
                <p style={{ margin: "0 0 14px", fontSize: "0.78rem", color: "var(--ink-soft)" }}>
                  Choose a blessing or type your own secret dream:
                </p>

                <div className="wish-chips">
                  {presetWishes.map((wish, idx) => (
                    <button
                      key={idx}
                      className={`wish-chip ${selectedChip === idx && !customWish ? "active" : ""}`}
                      onClick={() => {
                        setSelectedChip(idx);
                        setCustomWish("");
                      }}
                    >
                      {wish.slice(0, 26)}...
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  className="lantern-wish-input"
                  placeholder="Or write your own secret wish here..."
                  value={customWish}
                  onChange={(e) => setCustomWish(e.target.value)}
                  maxLength={120}
                />

                <div style={{ marginTop: "16px" }}>
                  <button className="release-lantern-btn" onClick={handleReleaseLantern}>
                    <Send size={15} />
                    <span>Release Lantern to the Stars</span>
                    <Sparkles size={15} />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Keepsake Certificate Card */
              <motion.div
                key="certificate"
                className="certificate-card"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="certificate-seal">
                  <Heart size={44} fill="var(--petal)" color="var(--petal-strong)" />
                </div>
                <h2>A Wish Sealed in the Stars</h2>
                <p style={{ fontStyle: "italic", color: "#ffeef2", fontSize: "1.05rem" }}>
                  "{currentWishText}"
                </p>
                <p>
                  Every spark of light you sent into the universe carries the warmth of who you are.
                  May the year ahead return every bit of joy you bring to this world tenfold.
                  <br /><br />
                  <strong>Happy Birthday, dearest Beeba! 🎂🌸✨</strong>
                </p>

                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "18px" }}>
                  <button className="text-button" onClick={handleRelight}>
                    <RotateCcw size={14} /> Relight candle
                  </button>
                  <button
                    className="seal-button"
                    onClick={() => {
                      sound.playChime(1.0);
                      setLocation("/");
                    }}
                  >
                    <span>Start from Chapter 1</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ marginTop: "24px" }}>
            <button
              className="text-button"
              onClick={() => {
                sound.playChime(0.9);
                setLocation("/gift");
              }}
            >
              <ArrowLeft size={15} /> Back to the gift
            </button>
          </div>
        </div>
      </section>
    </BirthdayShell>
  );
}
