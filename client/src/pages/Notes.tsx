/* Petal Postcard design reminder: this route creates an intimate tactile keepsake moment for Yusra,
   featuring folded parchment notes, an interactive 'Reasons You're Irreplaceable' jar, and gold-trimmed cards. */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Heart, RefreshCw, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import BirthdayShell from "@/components/BirthdayShell";
import { sound } from "@/lib/soundFx";

const sweetReasons = [
  "The effortless kindness you show to others, even in the quietest moments.",
  "Your lovely, contagious laughter that softens any stressful day.",
  "The rare grace and quiet strength with which you navigate life.",
  "Your wonderful eye for beauty, detail, and making things special.",
  "How safe, understood, and appreciated you make people feel.",
  "Your genuine heart—in a crowded world, you remain purely yourself.",
  "The sparkling energy and warmth you bring just by stepping into the room.",
];

export default function Notes() {
  const [, setLocation] = useLocation();
  const [openedCards, setOpenedCards] = useState<number[]>([]);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [drawnCount, setDrawnCount] = useState(1);

  const toggleCard = (index: number) => {
    sound.playChime(1.0 + index * 0.15);
    setOpenedCards((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  };

  const drawNextReason = () => {
    sound.playChime(1.4);
    setReasonIndex((prev) => (prev + 1) % sweetReasons.length);
    setDrawnCount((prev) => prev + 1);
  };

  const allNotesUnlocked = openedCards.length >= 3 && drawnCount >= 2;

  return (
    <BirthdayShell step={2} label="Keepsake notes for Yusra">
      <section className="screen notes-screen" aria-labelledby="notes-title">
        <div className="screen-heading compact-heading">
          <p className="chapter-label">chapter two · keepsakes</p>
          <h1 id="notes-title">
            Treasures for<br />
            <em>Yusra.</em>
          </h1>
          <p>
            Touch each keepsake below to reveal what has been written for you.
          </p>
        </div>

        <div className="notes-container" style={{ margin: "28px 0" }}>
          <div className="keepsake-grid">
            {/* Keepsake 1: Your Warmth */}
            <motion.div
              className="keepsake-card"
              onClick={() => toggleCard(0)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="keepsake-pin" />
              <div className="card-header-badge">
                <Heart size={13} fill="currentColor" />
                <span>Stationery No. 1</span>
              </div>
              <h3 className="card-title">Your Warmth</h3>
              <AnimatePresence mode="wait">
                {openedCards.includes(0) ? (
                  <motion.div
                    key="content"
                    className="card-content-reveal"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    You have an innate gift for making people feel seen and cherished.
                    Your presence is a soft landing, a gentle reminder that warmth and
                    sincerity still exist in this world.
                  </motion.div>
                ) : (
                  <div className="card-unfold-prompt">
                    <span>Tap to unfold note</span>
                    <Heart size={14} />
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Keepsake 2: Your Magic */}
            <motion.div
              className="keepsake-card"
              onClick={() => toggleCard(1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="keepsake-pin" />
              <div className="card-header-badge">
                <Sparkles size={13} />
                <span>Stationery No. 2</span>
              </div>
              <h3 className="card-title">Your Magic</h3>
              <AnimatePresence mode="wait">
                {openedCards.includes(1) ? (
                  <motion.div
                    key="content"
                    className="card-content-reveal"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    You carry a light that cannot be duplicated. The way you care,
                    the subtle details you notice, and your gentle spirit are pure magic.
                    Never let anyone persuade you to dim it.
                  </motion.div>
                ) : (
                  <div className="card-unfold-prompt">
                    <span>Tap to unfold note</span>
                    <Sparkles size={14} />
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Keepsake 3: Next Chapter */}
            <motion.div
              className="keepsake-card"
              onClick={() => toggleCard(2)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="keepsake-pin" />
              <div className="card-header-badge">
                <Star size={13} />
                <span>Stationery No. 3</span>
              </div>
              <h3 className="card-title">Your Next Chapter</h3>
              <AnimatePresence mode="wait">
                {openedCards.includes(2) ? (
                  <motion.div
                    key="content"
                    className="card-content-reveal"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    May your new year be painted with unexpected kindness, joyful breakthroughs,
                    and peace that settles deep into your soul. The best chapters of your story
                    are still being written.
                  </motion.div>
                ) : (
                  <div className="card-unfold-prompt">
                    <span>Tap to unfold note</span>
                    <Star size={14} />
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Interactive Reasons Jar */}
          <div className="reasons-jar-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="card-header-badge" style={{ color: "#ffd700", margin: 0 }}>
                <BookOpen size={14} />
                <span>Little Reminders Capsule</span>
              </div>
              <span style={{ fontSize: "0.58rem", color: "var(--petal)", fontWeight: 800 }}>
                Reason {reasonIndex + 1} of {sweetReasons.length}
              </span>
            </div>

            <div className="jar-scroll-box">
              <AnimatePresence mode="wait">
                <motion.div
                  key={reasonIndex}
                  className="jar-scroll-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  "{sweetReasons[reasonIndex]}"
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <button className="draw-reason-btn" onClick={drawNextReason}>
                <RefreshCw size={13} />
                <span>Unroll another reason</span>
              </button>

              <span style={{ fontSize: "0.62rem", color: "var(--ink-soft)" }}>
                ✨ {drawnCount >= 2 ? "Capsule explored" : "Tap once more to unlock gift"}
              </span>
            </div>
          </div>
        </div>

        <div className="page-actions two-actions">
          <button
            className="text-button"
            onClick={() => {
              sound.playChime(0.9);
              setLocation("/");
            }}
          >
            <ArrowLeft size={15} /> Back to letter
          </button>
          <button
            className="seal-button"
            onClick={() => {
              sound.playCelebration();
              setLocation("/gift");
            }}
            disabled={!allNotesUnlocked}
          >
            <span>
              {allNotesUnlocked
                ? "Unlock Your Gift"
                : `${openedCards.length}/3 notes & capsule`}
            </span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </BirthdayShell>
  );
}
