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

// Play a note with smooth attack/release
export function playNote(
  ctx: AudioContext,
  frequency: number
): OscillatorNode {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  // Smooth attack
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.start();

  // Store gainNode reference for smooth release
  (oscillator as OscillatorNode & { _gainNode?: GainNode })._gainNode = gainNode;

  return oscillator;
}

// Stop a note with smooth fade out
export function stopNote(oscillator: OscillatorNode, ctx: AudioContext): void {
  const gainNode = (oscillator as OscillatorNode & { _gainNode?: GainNode })._gainNode;
  if (gainNode) {
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
    setTimeout(() => {
      oscillator.stop();
      oscillator.disconnect();
      gainNode.disconnect();
    }, 150);
  } else {
    oscillator.stop();
    oscillator.disconnect();
  }
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
