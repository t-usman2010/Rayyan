/* Petal Postcard design reminder: this shared frame makes every route feel like one chapter of a
   hand-prepared birthday card, with an ownable bow-heart seal and clear mobile progress cues. */
import { Sparkles, Volume2, VolumeX } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import SparkleTrail from "./SparkleTrail";
import { sound } from "@/lib/soundFx";

const logo = "/media/petal-bow-heart-logo.png";

type BirthdayShellProps = {
  children: ReactNode;
  step: number;
  label: string;
};

export default function BirthdayShell({ children, step, label }: BirthdayShellProps) {
  const [location, setLocation] = useLocation();
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  const toggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sound.playChime(1.2);
    }
  };

  return (
    <div className="birthday-app">
      <SparkleTrail />
      <div className="paper-grain" aria-hidden="true" />
      <header className="journey-header">
        <button className="journey-brand" onClick={() => setLocation("/")} aria-label="Return to Yusra's birthday home">
          <img src={logo} alt="" />
          <span><strong>Happy Birthday, Yusra</strong><small>a little surprise</small></span>
        </button>

        <div className="header-actions">
          <button
            className="sound-toggle-btn"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute interactive chimes" : "Enable interactive chimes"}
            title={soundEnabled ? "Sound effects on" : "Sound effects muted"}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span className="sound-toggle-label">{soundEnabled ? "Chimes On" : "Chimes Off"}</span>
          </button>
          <div className="journey-tag">
            <Sparkles size={12} />
            <span>Chapter {step}/4</span>
          </div>
        </div>
      </header>
      <div className="journey-progress" aria-label={`Journey step ${step} of 4: ${label}`}>
        {[1, 2, 3, 4].map((item) => (
          <span className={item <= step ? "is-current" : ""} key={item} />
        ))}
      </div>
      <main className="journey-main">{children}</main>
    </div>
  );
}
