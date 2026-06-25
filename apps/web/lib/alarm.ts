// Timer alarm via the Web Audio API — no audio files, no dependencies. Returns a
// stop() function so callers can silence it early (e.g. on Reset). Safe to call
// from event handlers only (needs a browser + a user gesture to start audio).

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

export function playAlarm(durationMs = 8000): () => void {
  if (typeof window === "undefined") return () => {};

  const Ctor =
    window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
  if (!Ctor) return () => {};

  const ctx = new Ctor();
  let stopped = false;

  // A short, attention-getting double-beep, repeated until duration elapses.
  const beep = (start: number, freq: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.3, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.25);
  };

  const t0 = ctx.currentTime;
  const cycles = Math.max(1, Math.floor(durationMs / 1000));
  for (let i = 0; i < cycles; i++) {
    beep(t0 + i * 1.0, 880);
    beep(t0 + i * 1.0 + 0.28, 1175);
  }

  const stop = () => {
    if (stopped) return;
    stopped = true;
    ctx.close().catch(() => {});
  };

  window.setTimeout(stop, durationMs);
  return stop;
}
