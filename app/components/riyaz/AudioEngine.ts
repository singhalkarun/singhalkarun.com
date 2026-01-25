// Sargam frequency ratios relative to Sa (just intonation)
export const SARGAM_RATIOS: Record<string, number> = {
  Sa: 1,
  Re: 9 / 8,
  Ga: 5 / 4,
  Ma: 4 / 3,
  Pa: 3 / 2,
  Dha: 5 / 3,
  Ni: 15 / 8,
  "Sa'": 2,
};

export const SARGAM_NOTES = ['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni', "Sa'"] as const;
export type SargamNote = (typeof SARGAM_NOTES)[number];

// Western note names mapping
export const SARGAM_TO_WESTERN: Record<SargamNote, string> = {
  Sa: 'C',
  Re: 'D',
  Ga: 'E',
  Ma: 'F',
  Pa: 'G',
  Dha: 'A',
  Ni: 'B',
  "Sa'": 'C',
};

export type NoteDisplayMode = 'sargam' | 'western';

export function getNoteName(note: SargamNote, mode: NoteDisplayMode): string {
  if (mode === 'western') {
    return SARGAM_TO_WESTERN[note];
  }
  return note;
}

// Key mappings
export type KeyMapping = 'sargam' | 'homerow';

export const KEY_MAPPINGS: Record<KeyMapping, { label: string; keys: Record<string, SargamNote>; display: Record<SargamNote, string> }> = {
  sargam: {
    label: 'Sargam (S R G M P D N)',
    keys: {
      s: 'Sa',
      r: 'Re',
      g: 'Ga',
      m: 'Ma',
      p: 'Pa',
      d: 'Dha',
      n: 'Ni',
      S: "Sa'", // Shift+S
    },
    display: {
      Sa: 'S',
      Re: 'R',
      Ga: 'G',
      Ma: 'M',
      Pa: 'P',
      Dha: 'D',
      Ni: 'N',
      "Sa'": '⇧S',
    },
  },
  homerow: {
    label: 'Home Row (A S D F G H J K)',
    keys: {
      a: 'Sa',
      s: 'Re',
      d: 'Ga',
      f: 'Ma',
      g: 'Pa',
      h: 'Dha',
      j: 'Ni',
      k: "Sa'",
    },
    display: {
      Sa: 'A',
      Re: 'S',
      Ga: 'D',
      Ma: 'F',
      Pa: 'G',
      Dha: 'H',
      Ni: 'J',
      "Sa'": 'K',
    },
  },
};

// Default key mapping (for backward compatibility)
export const KEY_TO_NOTE = KEY_MAPPINGS.sargam.keys;

// Base frequency options (Western notes)
export const BASE_FREQUENCIES: { label: string; value: number }[] = [
  { label: 'C3 (131 Hz)', value: 130.81 },
  { label: 'D3 (147 Hz)', value: 146.83 },
  { label: 'E3 (165 Hz)', value: 164.81 },
  { label: 'F3 (175 Hz)', value: 174.61 },
  { label: 'G3 (196 Hz)', value: 196.0 },
  { label: 'A3 (220 Hz)', value: 220.0 },
  { label: 'B3 (247 Hz)', value: 246.94 },
  { label: 'C4 (262 Hz)', value: 261.63 },
  { label: 'D4 (294 Hz)', value: 293.66 },
  { label: 'E4 (330 Hz)', value: 329.63 },
  { label: 'F4 (349 Hz)', value: 349.23 },
  { label: 'G4 (392 Hz)', value: 392.0 },
  { label: 'A4 (440 Hz)', value: 440.0 },
  { label: 'B4 (494 Hz)', value: 493.88 },
  { label: 'C5 (523 Hz)', value: 523.25 },
];

export const DEFAULT_BASE_FREQUENCY = 261.63; // C4

// Harmonic structure for tanpura-like sound
// Each harmonic: [frequency multiplier, amplitude, detune in cents]
const HARMONICS = [
  [1, 0.5, 0],        // Fundamental
  [1, 0.25, 3],       // Slightly detuned fundamental (creates beating)
  [1, 0.25, -3],      // Slightly detuned other way
  [2, 0.3, 0],        // 2nd harmonic (octave)
  [2, 0.1, 5],        // Detuned octave
  [3, 0.15, 0],       // 3rd harmonic
  [4, 0.1, 0],        // 4th harmonic
  [5, 0.05, 0],       // 5th harmonic
  [6, 0.03, 0],       // 6th harmonic
];

// Voice/instrument node with all oscillators and nodes
export interface VoiceNode {
  oscillators: OscillatorNode[];
  gainNodes: GainNode[];
  masterGain: GainNode;
  vibratoLFO: OscillatorNode;
  vibratoGain: GainNode;
  filter: BiquadFilterNode;
}

// Play a note with rich harmonic content (tanpura-like)
export function playNote(
  ctx: AudioContext,
  frequency: number
): VoiceNode {
  const oscillators: OscillatorNode[] = [];
  const gainNodes: GainNode[] = [];

  // Master gain for overall volume control and envelope
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, ctx.currentTime);

  // Low-pass filter to warm up the sound
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(frequency * 8, ctx.currentTime); // Cut high frequencies
  filter.Q.setValueAtTime(0.5, ctx.currentTime);

  // Vibrato LFO (subtle pitch modulation)
  const vibratoLFO = ctx.createOscillator();
  const vibratoGain = ctx.createGain();
  vibratoLFO.type = 'sine';
  vibratoLFO.frequency.setValueAtTime(5, ctx.currentTime); // 5 Hz vibrato rate
  vibratoGain.gain.setValueAtTime(2, ctx.currentTime); // 2 cents depth (subtle)
  vibratoLFO.connect(vibratoGain);
  vibratoLFO.start();

  // Create oscillators for each harmonic
  HARMONICS.forEach(([multiplier, amplitude, detune]) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Use different waveforms for different harmonics
    if (multiplier === 1) {
      osc.type = 'sine'; // Pure fundamental
    } else if (multiplier <= 3) {
      osc.type = 'triangle'; // Soft harmonics
    } else {
      osc.type = 'sine'; // Higher harmonics as sine
    }

    osc.frequency.setValueAtTime(frequency * (multiplier as number), ctx.currentTime);
    osc.detune.setValueAtTime(detune as number, ctx.currentTime);

    // Connect vibrato to fundamental oscillators only
    if (multiplier === 1) {
      vibratoGain.connect(osc.detune);
    }

    gain.gain.setValueAtTime(amplitude as number, ctx.currentTime);

    osc.connect(gain);
    gain.connect(filter);

    oscillators.push(osc);
    gainNodes.push(gain);

    osc.start();
  });

  // Connect filter -> master gain -> destination
  filter.connect(masterGain);
  masterGain.connect(ctx.destination);

  // ADSR Envelope - Attack
  const attackTime = 0.08;
  const peakLevel = 0.25;
  const sustainLevel = 0.2;

  masterGain.gain.linearRampToValueAtTime(peakLevel, ctx.currentTime + attackTime);
  // Decay to sustain
  masterGain.gain.linearRampToValueAtTime(sustainLevel, ctx.currentTime + attackTime + 0.1);

  return {
    oscillators,
    gainNodes,
    masterGain,
    vibratoLFO,
    vibratoGain,
    filter,
  };
}

// Stop a note with smooth fade out
export function stopNote(voice: VoiceNode, ctx: AudioContext): void {
  const releaseTime = 0.15;

  // Fade out master gain
  voice.masterGain.gain.cancelScheduledValues(ctx.currentTime);
  voice.masterGain.gain.setValueAtTime(voice.masterGain.gain.value, ctx.currentTime);
  voice.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + releaseTime);

  // Stop and disconnect after release
  setTimeout(() => {
    voice.vibratoLFO.stop();
    voice.vibratoLFO.disconnect();
    voice.vibratoGain.disconnect();

    voice.oscillators.forEach((osc, i) => {
      osc.stop();
      osc.disconnect();
      voice.gainNodes[i].disconnect();
    });

    voice.filter.disconnect();
    voice.masterGain.disconnect();
  }, releaseTime * 1000 + 50);
}

// Get the frequency for a specific note given a base Sa frequency
export function getNoteFrequency(note: SargamNote, baseSa: number): number {
  return baseSa * SARGAM_RATIOS[note];
}

// Practice patterns (alankars)
export interface Pattern {
  id: string;
  name: string;
  notes: SargamNote[];
}

export const PATTERNS: Pattern[] = [
  {
    id: 'aroha-avaroha',
    name: 'Aroha-Avaroha',
    notes: [
      'Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni', "Sa'",
      "Sa'", 'Ni', 'Dha', 'Pa', 'Ma', 'Ga', 'Re', 'Sa',
    ],
  },
  {
    id: 'alankar-1',
    name: 'Alankar 1 (Doubled)',
    notes: [
      'Sa', 'Sa', 'Re', 'Re', 'Ga', 'Ga', 'Ma', 'Ma',
      'Pa', 'Pa', 'Dha', 'Dha', 'Ni', 'Ni', "Sa'", "Sa'",
      "Sa'", "Sa'", 'Ni', 'Ni', 'Dha', 'Dha', 'Pa', 'Pa',
      'Ma', 'Ma', 'Ga', 'Ga', 'Re', 'Re', 'Sa', 'Sa',
    ],
  },
  {
    id: 'alankar-2',
    name: 'Alankar 2 (Pairs)',
    notes: [
      'Sa', 'Re', 'Re', 'Ga', 'Ga', 'Ma', 'Ma', 'Pa',
      'Pa', 'Dha', 'Dha', 'Ni', 'Ni', "Sa'",
      "Sa'", 'Ni', 'Ni', 'Dha', 'Dha', 'Pa', 'Pa', 'Ma',
      'Ma', 'Ga', 'Ga', 'Re', 'Re', 'Sa',
    ],
  },
  {
    id: 'alankar-3',
    name: 'Alankar 3 (Triplets)',
    notes: [
      'Sa', 'Re', 'Ga', 'Re', 'Ga', 'Ma', 'Ga', 'Ma', 'Pa',
      'Ma', 'Pa', 'Dha', 'Pa', 'Dha', 'Ni', 'Dha', 'Ni', "Sa'",
      "Sa'", 'Ni', 'Dha', 'Ni', 'Dha', 'Pa', 'Dha', 'Pa', 'Ma',
      'Pa', 'Ma', 'Ga', 'Ma', 'Ga', 'Re', 'Ga', 'Re', 'Sa',
    ],
  },
  {
    id: 'alankar-4',
    name: 'Alankar 4 (Quads)',
    notes: [
      'Sa', 'Re', 'Ga', 'Ma', 'Re', 'Ga', 'Ma', 'Pa',
      'Ga', 'Ma', 'Pa', 'Dha', 'Ma', 'Pa', 'Dha', 'Ni',
      'Pa', 'Dha', 'Ni', "Sa'",
      "Sa'", 'Ni', 'Dha', 'Pa', 'Ni', 'Dha', 'Pa', 'Ma',
      'Dha', 'Pa', 'Ma', 'Ga', 'Pa', 'Ma', 'Ga', 'Re',
      'Ma', 'Ga', 'Re', 'Sa',
    ],
  },
  {
    id: 'alankar-5',
    name: 'Alankar 5 (Skips)',
    notes: [
      'Sa', 'Ga', 'Re', 'Ma', 'Ga', 'Pa', 'Ma', 'Dha',
      'Pa', 'Ni', 'Dha', "Sa'",
      "Sa'", 'Dha', 'Ni', 'Pa', 'Dha', 'Ma', 'Pa', 'Ga',
      'Ma', 'Re', 'Ga', 'Sa',
    ],
  },
  {
    id: 'alankar-6',
    name: 'Alankar 6 (Zigzag)',
    notes: [
      'Sa', 'Re', 'Sa', 'Re', 'Ga', 'Re', 'Ga', 'Ma', 'Ga',
      'Ma', 'Pa', 'Ma', 'Pa', 'Dha', 'Pa', 'Dha', 'Ni', 'Dha',
      'Ni', "Sa'", 'Ni',
      "Sa'", 'Ni', "Sa'", 'Ni', 'Dha', 'Ni', 'Dha', 'Pa', 'Dha',
      'Pa', 'Ma', 'Pa', 'Ma', 'Ga', 'Ma', 'Ga', 'Re', 'Ga',
      'Re', 'Sa', 'Re',
    ],
  },
];

// Speed options (BPM)
export const SPEED_OPTIONS = [
  { label: 'Slow', bpm: 60 },
  { label: 'Medium', bpm: 90 },
  { label: 'Fast', bpm: 120 },
];
