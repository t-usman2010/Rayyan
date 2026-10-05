// Procedural sound effects using Web Audio API - 100% offline, zero external dependencies.

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Soft wax seal pop / click
  playSealPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);

      // Add a tiny high click
      const click = ctx.createOscillator();
      const clickGain = ctx.createGain();
      click.type = "triangle";
      click.frequency.setValueAtTime(900, now);
      click.frequency.exponentialRampToValueAtTime(200, now + 0.04);
      clickGain.gain.setValueAtTime(0.18, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      click.connect(clickGain);
      clickGain.connect(ctx.destination);
      click.start(now);
      click.stop(now + 0.05);
    } catch {
      // Audio context might be restricted
    }
  }

  // Delicate music box chime (note unfolding / discovering)
  playChime(pitchMultiplier = 1) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const baseFreq = notes[Math.floor(Math.random() * notes.length)] * pitchMultiplier;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.82);
    } catch {
      // audio error ignored
    }
  }

  // Celebratory sparkle harp run (gift open / big moment)
  playCelebration() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const chord = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];
      chord.forEach((freq, idx) => {
        const now = ctx.currentTime + idx * 0.06;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.62);
      });
    } catch {
      // ignored
    }
  }

  // Candle blow-out: soft airy whoosh followed by starlight chimes
  playBlowCandle() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // White noise buffer for gentle puff
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.3);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);

      // Followed by twinkling harmonic
      setTimeout(() => {
        this.playChime(1.5);
      }, 250);
    } catch {
      // ignored
    }
  }

  // Sky lantern floating up: dreamy ascending tone
  playLanternAscent() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 1.2);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {
      // ignored
    }
  }
}

export const sound = new SoundEffects();
