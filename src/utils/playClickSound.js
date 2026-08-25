let audioCtx = null;
let lastPlayAt = 0;

/**
 * Short, crisp "click" sound for UI interactions (theme toggle, nav, buttons).
 * Uses WebAudio (no external assets) so it works offline.
 */
export function playClickSound() {
  try {
    const now = Date.now();
    if (now - lastPlayAt < 60) return; // prevent rapid stacking
    lastPlayAt = now;

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;

    if (!audioCtx) audioCtx = new AudioContextCtor();
    if (audioCtx.state === 'suspended') {
      // Must be called from a user gesture; this function is.
      audioCtx.resume?.();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // A brief high-frequency tone with a fast attack/decay -> "click" feel.
    osc.type = 'sine';
    osc.frequency.value = 2000;

    const t = audioCtx.currentTime;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.03);
  } catch {
    // Ignore audio errors (autoplay policies, etc.)
  }
}

