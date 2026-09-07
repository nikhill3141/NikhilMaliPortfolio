let audioCtx = null;
let lastPlayAt = 0;

/**
 * Premium UI click sound.
 *
 * - Slightly louder than the original
 * - Very short and crisp
 * - Small pitch sweep for a more tactile feel
 * - Subtle harmonic layer
 * - Prevents accidental rapid stacking
 */
export function playClickSound() {
  try {
    const now = Date.now();

    // Prevent multiple sounds from stacking
    if (now - lastPlayAt < 60) return;
    lastPlayAt = now;

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextCtor) return;

    if (!audioCtx) {
      audioCtx = new AudioContextCtor();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume?.();
    }

    const t = audioCtx.currentTime;

    /* =====================================================
       MASTER GAIN
    ===================================================== */

    const masterGain = audioCtx.createGain();

    // Slightly louder than your original 0.05
    masterGain.gain.setValueAtTime(0.8, t);

    masterGain.connect(audioCtx.destination);

    /* =====================================================
       MAIN CLICK
    ===================================================== */

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";

    // Start slightly higher and quickly fall
    // This gives the click a tactile feel.
    osc.frequency.setValueAtTime(2100, t);
    osc.frequency.exponentialRampToValueAtTime(1500, t + 0.035);

    gain.gain.setValueAtTime(0.0001, t);

    // Slightly louder main tone
    gain.gain.exponentialRampToValueAtTime(0.075, t + 0.003);

    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(t);
    osc.stop(t + 0.04);

    /* =====================================================
       SUBTLE HIGH-FREQUENCY TICK
    ===================================================== */

    const tickOsc = audioCtx.createOscillator();
    const tickGain = audioCtx.createGain();

    tickOsc.type = "triangle";

    tickOsc.frequency.setValueAtTime(3800, t);
    tickOsc.frequency.exponentialRampToValueAtTime(2600, t + 0.018);

    tickGain.gain.setValueAtTime(0.0001, t);

    tickGain.gain.exponentialRampToValueAtTime(0.025, t + 0.002);

    tickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);

    tickOsc.connect(tickGain);
    tickGain.connect(masterGain);

    tickOsc.start(t);
    tickOsc.stop(t + 0.02);
  } catch {
    // Ignore audio errors
  }
}
