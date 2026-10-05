/* Petal Postcard design reminder: welcome Beeba with a tactile wax-sealed envelope
   that invites her to break the seal, unfolding a handwritten letter before beginning the journey. */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, Mail, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import BirthdayShell from "@/components/BirthdayShell";
import { sound } from "@/lib/soundFx";

export default function Home() {
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    sound.playSealPop();
    setIsOpen(true);
  };

  return (
    <BirthdayShell step={1} label="A note for Beeba">
      <section className="screen welcome-screen" aria-labelledby="welcome-title">
        <motion.div
          className="welcome-copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="chapter-label">
            <Heart size={13} fill="currentColor" /> a special delivery for
          </p>
          <h1 id="welcome-title">
            Dear <em>Beeba,</em>
          </h1>
          <p className="welcome-message">
            Today the world has a little more sparkle because it belongs to you. Here is a tiny,
            handcrafted birthday keepsake—sealed with love and saved just for you.
          </p>

          {/* Interactive Vintage Wax-Sealed Envelope */}
          <div className="envelope-stage">
            <motion.div
              className="envelope-wrapper"
              layout
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="envelope-stamp-row">
                <div className="envelope-address">
                  <span>Priority Airmail · Keepsake Edition</span>
                  <strong>Miss Beeba</strong>
                </div>

                <div className="vintage-stamp">
                  <span>Special</span>
                  <strong>OCT 6</strong>
                  <small>For Her</small>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div
                    className="envelope-seal-zone"
                    key="sealed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <motion.button
                      className="wax-seal-interact"
                      onClick={handleOpenEnvelope}
                      whileHover={{ scale: 1.08, rotate: -2 }}
                      whileTap={{ scale: 0.94 }}
                      aria-label="Break the wax seal to read Beeba's letter"
                    >
                      <span className="wax-seal-inner-ring" />
                      <Heart size={26} fill="currentColor" />
                    </motion.button>
                    <span className="seal-hint">✨ Tap the wax seal to open ✨</span>
                  </motion.div>
                ) : (
                  <motion.div
                    className="unfolded-letter"
                    key="unfolded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="letter-salutation">Happy Birthday, Beeba 🌸</div>
                    <div className="letter-body">
                      In a world that often rushes by, you carry a rare and gentle grace. Your
                      laughter brings lightness to ordinary rooms, and your warmth makes everyone
                      around you feel safe and appreciated.
                      <br /><br />
                      This keepsake holds four small chapters made especially for you. Take your
                      time, enjoy every little secret, and remember how deeply you are celebrated.
                    </div>
                    <div className="letter-sign-off">With all the sweetest wishes 💌</div>

                    <div style={{ marginTop: "22px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                      <button
                        className="seal-button"
                        onClick={() => {
                          sound.playChime(1.1);
                          setLocation("/little-notes");
                        }}
                      >
                        <Heart size={16} fill="currentColor" />
                        <span>Begin Your Journey</span>
                        <ArrowRight size={16} />
                      </button>

                      <button
                        className="text-button"
                        onClick={() => {
                          sound.playSealPop();
                          setIsOpen(false);
                        }}
                      >
                        <Mail size={14} /> Seal letter
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <p className="tap-note">
            <Sparkles size={13} /> Four small chapters. Made with love.
          </p>
        </motion.div>

        {/* Decorative Visual Frame */}
        <motion.div
          className="welcome-art"
          initial={{ opacity: 0, scale: 0.96, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <div className="welcome-art-frame">
            <img
              src="/media/petal-postcard-hero.jpg"
              alt="Pink birthday gifts, bows, flowers, and a heart-shaped keepsake"
            />
          </div>
          <div className="taped-note note-top">
            <span>for a very</span>
            <strong>lovely<br />girl</strong>
          </div>
          <div className="taped-note note-bottom">
            <strong>open me<br />slowly</strong>
            <span>something sweet is inside</span>
          </div>
          <Sparkles className="art-sparkle sparkle-one" size={28} aria-hidden="true" />
          <Heart className="art-heart" size={23} fill="currentColor" aria-hidden="true" />
        </motion.div>
      </section>
    </BirthdayShell>
  );
}
