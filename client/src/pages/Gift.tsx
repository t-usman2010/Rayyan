/* Petal Postcard design reminder: the gift is the tactile center of the journey—an unmissable,
  replayable wrapped-object interaction that visibly opens before revealing Yusra's Holographic VIP Birthday Pass. */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Heart, RotateCcw, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import BirthdayShell from "@/components/BirthdayShell";
import { sound } from "@/lib/soundFx";

const logo = "/media/petal-bow-heart-logo.png";
const confettiColors = ["#800020", "#B76E79", "#A61C3C", "#F5F0EC", "#FFC107", "#E0A96D", "#FF69B4"];

type GiftState = "ready" | "opening" | "open";

export default function Gift() {
  const [, setLocation] = useLocation();
  const [giftState, setGiftState] = useState<GiftState>("ready");
  const [giftKey, setGiftKey] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [foilScratched, setFoilScratched] = useState(false);

  useEffect(() => {
    if (giftState !== "opening") return;
    const timer = window.setTimeout(() => {
      setGiftState("open");
      sound.playCelebration();
    }, 780);
    return () => window.clearTimeout(timer);
  }, [giftState]);

  useEffect(() => {
    if (!showPopUp) return;
    const timer = window.setTimeout(() => setShowPopUp(false), 2800);
    return () => window.clearTimeout(timer);
  }, [showPopUp]);

  const unwrap = () => {
    if (giftState === "ready") {
      sound.playSealPop();
      setShowPopUp(true);
      setGiftState("opening");
    }
  };

  const replay = () => {
    sound.playChime(1.0);
    setShowPopUp(false);
    setFoilScratched(false);
    setGiftState("ready");
    setGiftKey((current) => current + 1);
  };

  const scratchFoil = () => {
    sound.playChime(1.5);
    setFoilScratched(true);
  };

  return (
    <BirthdayShell step={3} label="Yusra's birthday gift">
      <section className="screen gift-screen" aria-labelledby="gift-title">
        <div className="screen-heading compact-heading gift-heading">
          <p className="chapter-label">chapter three · the surprise</p>
          <h1 id="gift-title">A present for <em>Yusra.</em></h1>
          <p>
            {giftState === "open"
              ? "You found it! Your Golden Birthday Pass is here."
              : "Tap the satin bow to untie the ribbons and open your present."}
          </p>
        </div>

        <div className="gift-page-stage">
          <div className="gift-postcard postcard-back" aria-hidden="true" />
          <div className="gift-postcard postcard-front" aria-hidden="true" />
          <div className="gift-side-note left">
            <span>special</span>
            <strong>unmissable<br />moment</strong>
          </div>
          <div className="gift-side-note right">
            <Sparkles size={15} />
            <span>made for<br />Yusra</span>
          </div>

          <motion.button
            className={`gift-object is-${giftState}`}
            key={giftKey}
            onClick={unwrap}
            whileTap={giftState === "ready" ? { scale: 0.97 } : undefined}
            aria-label={giftState === "ready" ? "Open Yusra's gift" : "Yusra's gift is open"}
            disabled={giftState !== "ready"}
          >
            <span className="gift-ribbon-tail tail-left" />
            <span className="gift-ribbon-tail tail-right" />
            <span className="gift-object-lid">
              <span className="gift-bow" />
            </span>
            <span className="gift-object-base">
              <span className="gift-seal">
                <img src={logo} alt="" />
              </span>
            </span>
            <span className="gift-object-label">
              {giftState === "ready" ? "✨ tap the bow ✨" : "unwrapping..."}
            </span>
          </motion.button>

          <Heart className="stage-heart one" size={22} fill="currentColor" aria-hidden="true" />
          <Heart className="stage-heart two" size={18} fill="currentColor" aria-hidden="true" />

          <AnimatePresence>
            {showPopUp && (
              <motion.div
                className="gift-pop-up"
                role="status"
                initial={{ opacity: 0, y: 18, scale: 0.92, rotate: 4 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.34, ease: [0.23, 1, 0.32, 1] }}
              >
                <span className="pop-up-seal">
                  <Heart size={17} fill="currentColor" />
                </span>
                <div>
                  <strong>Yay, Yusra!</strong>
                  <span>Your birthday surprise is blooming open.</span>
                </div>
                <Sparkles className="pop-up-sparkle" size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {giftState === "open" && (
            <>
              {/* Confetti Explosion */}
              <motion.div className="confetti-layer" aria-hidden="true">
                {Array.from({ length: 65 }).map((_, index) => {
                  const angle = (index * 137.5 * Math.PI) / 180;
                  const distance = 90 + (index * 39) % 360;
                  const confettiType =
                    index % 5 === 0
                      ? "is-star"
                      : index % 3 === 0
                      ? "is-ribbon"
                      : "is-petal";
                  return (
                    <motion.span
                      className={`confetti ${confettiType}`}
                      key={index}
                      style={{
                        backgroundColor: confettiColors[index % confettiColors.length],
                      }}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        rotate: index * 12,
                        scale: 0.7,
                      }}
                      animate={{
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance + 400,
                        opacity: 0,
                        rotate: 320 + index * 40,
                        scale: 1.15,
                      }}
                      transition={{
                        duration: 1.5 + (index % 5) * 0.12,
                        ease: "easeOut",
                      }}
                    />
                  );
                })}
              </motion.div>

              {/* The Holographic Gold VIP Birthday Pass */}
              <motion.div
                className="holographic-container"
                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="holographic-pass">
                  <div className="pass-header">
                    <span className="pass-badge">✨ Official VIP Pass</span>
                    <span className="pass-serial">NO. YUSRA-2026-BDAY</span>
                  </div>

                  <div className="pass-title-row">
                    <span>Lifetime Keepsake Edition</span>
                    <h3>The Golden Birthday Pass</h3>
                  </div>

                  <p style={{ margin: "8px 0 0", fontSize: "0.78rem", color: "var(--ink-soft)" }}>
                    Admit One: <strong style={{ color: "#fff" }}>Miss Yusra</strong> · Fully Entitled to:
                  </p>

                  <ul className="pass-perks-list">
                    <li className="pass-perk-item">
                      <CheckCircle2 size={15} />
                      <span>365 Days of Pure Smiles, Warm Laughter & Good Energy</span>
                    </li>
                    <li className="pass-perk-item">
                      <CheckCircle2 size={15} />
                      <span>Total Immunity from Dull Days and Petty Worries</span>
                    </li>
                    <li className="pass-perk-item">
                      <CheckCircle2 size={15} />
                      <span>Unlimited "Treat Yourself" & Pampering Privileges</span>
                    </li>
                    <li className="pass-perk-item">
                      <CheckCircle2 size={15} />
                      <span>Endless Love, Deep Peace, and Dreams Taking Flight</span>
                    </li>
                  </ul>

                  {/* Interactive Scratch-Off Foil */}
                  <div className="scratch-secret-zone">
                    <AnimatePresence mode="wait">
                      {!foilScratched ? (
                        <motion.div
                          key="foil"
                          className="scratch-secret-box scratch-cover"
                          onClick={scratchFoil}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Star size={14} fill="currentColor" />
                          <span>Tap gold foil to reveal secret message</span>
                          <Sparkles size={14} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="revealed"
                          className="scratch-revealed"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          "P.S. There will never be anyone quite like you in this entire world.
                          You are extraordinary, loved, and meant for great things." 🌸
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="reveal-actions" style={{ marginTop: "24px" }}>
                    <button className="text-button" onClick={replay}>
                      <RotateCcw size={14} /> Open it again
                    </button>
                    <button
                      className="seal-button"
                      onClick={() => {
                        sound.playChime(1.2);
                        setLocation("/wish");
                      }}
                    >
                      <span>Final chapter: Make a wish</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {giftState !== "open" && (
          <button
            className="text-button gift-back"
            onClick={() => {
              sound.playChime(0.9);
              setLocation("/little-notes");
            }}
          >
            <ArrowLeft size={15} /> Back to the notes
          </button>
        )}
      </section>
    </BirthdayShell>
  );
}
