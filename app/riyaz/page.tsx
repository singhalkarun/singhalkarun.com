'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import SargamKeyboard from '@/app/components/riyaz/SargamKeyboard';
import SargamTimeline from '@/app/components/riyaz/SargamTimeline';
import { useRiyazTheme } from '@/app/contexts/RiyazThemeContext';
import {
  BASE_FREQUENCIES,
  DEFAULT_BASE_FREQUENCY,
  KEY_MAPPINGS,
  PATTERNS,
  SPEED_OPTIONS,
  playNote,
  stopNote,
  getNoteFrequency,
  type KeyMapping,
  type SargamNote,
  type VoiceNode,
  type NoteDisplayMode,
} from '@/app/components/riyaz/AudioEngine';

type Mode = 'manual' | 'practice';

export default function RiyazPage() {
  const { theme, setTheme } = useRiyazTheme();
  const [baseFrequency, setBaseFrequency] = useState(DEFAULT_BASE_FREQUENCY);
  const [activeNote, setActiveNote] = useState<SargamNote | null>(null);
  const [mode, setMode] = useState<Mode>('manual');
  const [selectedPattern, setSelectedPattern] = useState(PATTERNS[0].id);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyMapping, setKeyMapping] = useState<KeyMapping>('sargam');
  const [noteDisplayMode, setNoteDisplayMode] = useState<NoteDisplayMode>('sargam');
  const [showSettings, setShowSettings] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const voiceRef = useRef<VoiceNode | null>(null);
  const activeKeysRef = useRef<Set<string>>(new Set());
  const playbackRef = useRef<{ timeoutId: NodeJS.Timeout | null; noteIndex: number }>({
    timeoutId: null,
    noteIndex: 0,
  });
  const settingsRef = useRef<HTMLDivElement>(null);

  const currentMapping = KEY_MAPPINGS[keyMapping];

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize audio context on first interaction
  const ensureAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Stop current voice
  const stopCurrentNote = useCallback(() => {
    if (voiceRef.current && audioContextRef.current) {
      stopNote(voiceRef.current, audioContextRef.current);
      voiceRef.current = null;
      setActiveNote(null);
    }
  }, []);

  // Start playing a note
  const handleNoteStart = useCallback(
    (note: SargamNote) => {
      const ctx = ensureAudioContext();
      if (!ctx) return;

      stopCurrentNote();

      const frequency = getNoteFrequency(note, baseFrequency);
      voiceRef.current = playNote(ctx, frequency);
      setActiveNote(note);
    },
    [ensureAudioContext, baseFrequency, stopCurrentNote]
  );

  // Stop playing a note
  const handleNoteEnd = useCallback(
    (note: SargamNote) => {
      if (activeNote === note) {
        stopCurrentNote();
      }
    },
    [activeNote, stopCurrentNote]
  );

  // Stop auto-play
  const stopAutoPlay = useCallback(() => {
    if (playbackRef.current.timeoutId) {
      clearTimeout(playbackRef.current.timeoutId);
      playbackRef.current.timeoutId = null;
    }
    playbackRef.current.noteIndex = 0;
    setIsPlaying(false);
    stopCurrentNote();
  }, [stopCurrentNote]);

  // Auto-play pattern
  const startAutoPlay = useCallback(() => {
    const ctx = ensureAudioContext();
    if (!ctx) return;

    const pattern = PATTERNS.find((p) => p.id === selectedPattern);
    if (!pattern) return;

    setIsPlaying(true);
    const bpm = SPEED_OPTIONS[speedIndex].bpm;
    const noteDuration = (60 / bpm) * 1000;

    const playNextNote = (index: number) => {
      // Loop back to start when reaching the end
      const currentIndex = index % pattern.notes.length;
      const note = pattern.notes[currentIndex];

      // Stop previous note
      if (voiceRef.current && audioContextRef.current) {
        stopNote(voiceRef.current, audioContextRef.current);
        voiceRef.current = null;
        setActiveNote(null);
      }

      // Add a small gap between notes (20% of note duration, min 50ms, max 150ms)
      const gapDuration = Math.max(50, Math.min(150, noteDuration * 0.2));

      // Schedule the gap and then play the next note
      playbackRef.current.timeoutId = setTimeout(() => {
        const frequency = getNoteFrequency(note, baseFrequency);
        voiceRef.current = playNote(ctx, frequency);
        setActiveNote(note);

        playbackRef.current.noteIndex = currentIndex;

        // Schedule next note after the remaining duration
        playbackRef.current.timeoutId = setTimeout(() => {
          playNextNote(index + 1);
        }, noteDuration - gapDuration);
      }, gapDuration);
    };

    playNextNote(0);
  }, [ensureAudioContext, selectedPattern, speedIndex, baseFrequency]);

  // Toggle play/stop
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }, [isPlaying, stopAutoPlay, startAutoPlay]);

  // Handle mode change
  const handleModeChange = (newMode: Mode) => {
    if (isPlaying) stopAutoPlay();
    setMode(newMode);
  };

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Space bar to toggle play in practice mode
      if (e.code === 'Space' && mode === 'practice') {
        e.preventDefault();
        togglePlay();
        return;
      }

      // Stop auto-play if user presses a note key
      if (isPlaying) {
        stopAutoPlay();
      }

      let key = e.key.toLowerCase();
      // Handle Shift+S for sargam mapping
      if (keyMapping === 'sargam' && e.key === 'S' && e.shiftKey) {
        key = 'S';
      }

      const note = currentMapping.keys[key];
      if (note && !activeKeysRef.current.has(key)) {
        activeKeysRef.current.add(key);
        handleNoteStart(note);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (keyMapping === 'sargam') {
        // Handle 's' and 'S' keys for sargam mapping
        if (key === 's' || e.key === 'S') {
          if (activeKeysRef.current.has('s')) {
            activeKeysRef.current.delete('s');
            const note = currentMapping.keys['s'];
            if (note) handleNoteEnd(note);
          }
          if (activeKeysRef.current.has('S')) {
            activeKeysRef.current.delete('S');
            const note = currentMapping.keys['S'];
            if (note) handleNoteEnd(note);
          }
          return;
        }
      }

      activeKeysRef.current.delete(key);
      const note = currentMapping.keys[key];
      if (note) handleNoteEnd(note);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleNoteStart, handleNoteEnd, togglePlay, isPlaying, stopAutoPlay, mode, keyMapping, currentMapping]);

  // Cleanup on unmount
  useEffect(() => {
    const playback = playbackRef.current;
    const audioContext = audioContextRef.current;
    return () => {
      if (playback.timeoutId) {
        clearTimeout(playback.timeoutId);
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] flex flex-col transition-colors">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-[#e5e5e5]">Riyaz</h1>
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-[#262626]">
            <button
              onClick={() => handleModeChange('manual')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
                mode === 'manual'
                  ? 'bg-gray-900 dark:bg-[#e5e5e5] text-white dark:text-[#1a1a1a]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#e5e5e5]'
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => handleModeChange('practice')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
                mode === 'practice'
                  ? 'bg-gray-900 dark:bg-[#e5e5e5] text-white dark:text-[#1a1a1a]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#e5e5e5]'
              }`}
            >
              Practice
            </button>
          </div>

          {/* Settings button */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                showSettings
                  ? 'bg-gray-100 dark:bg-gray-800'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title="Settings"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {/* Settings dropdown */}
            {showSettings && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#262626] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10">
                <div className="px-3 py-2">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Theme
                  </p>
                  <div className="space-y-1">
                    {(['light', 'dark', 'system'] as const).map((themeOption) => (
                      <button
                        key={themeOption}
                        onClick={() => {
                          setTheme(themeOption);
                          setShowSettings(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all cursor-pointer capitalize ${
                          theme === themeOption
                            ? 'bg-gray-900 dark:bg-[#e5e5e5] text-white dark:text-[#1a1a1a]'
                            : 'text-gray-700 dark:text-[#d4d4d4] hover:bg-gray-100 dark:hover:bg-[#333333]'
                        }`}
                      >
                        {themeOption}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 px-3 py-2">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Keyboard Layout
                  </p>
                  <div className="space-y-1">
                    {(Object.keys(KEY_MAPPINGS) as KeyMapping[]).map((mapping) => (
                      <button
                        key={mapping}
                        onClick={() => {
                          setKeyMapping(mapping);
                          setShowSettings(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${
                          keyMapping === mapping
                            ? 'bg-gray-900 dark:bg-[#e5e5e5] text-white dark:text-[#1a1a1a]'
                            : 'text-gray-700 dark:text-[#d4d4d4] hover:bg-gray-100 dark:hover:bg-[#333333]'
                        }`}
                      >
                        {KEY_MAPPINGS[mapping].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 px-3 py-2">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Note Display
                  </p>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setNoteDisplayMode('sargam');
                        setShowSettings(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${
                        noteDisplayMode === 'sargam'
                          ? 'bg-gray-900 dark:bg-[#e5e5e5] text-white dark:text-[#1a1a1a]'
                          : 'text-gray-700 dark:text-[#d4d4d4] hover:bg-gray-100 dark:hover:bg-[#333333]'
                      }`}
                    >
                      Sargam (Sa Re Ga Ma...)
                    </button>
                    <button
                      onClick={() => {
                        setNoteDisplayMode('western');
                        setShowSettings(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${
                        noteDisplayMode === 'western'
                          ? 'bg-gray-900 dark:bg-[#e5e5e5] text-white dark:text-[#1a1a1a]'
                          : 'text-gray-700 dark:text-[#d4d4d4] hover:bg-gray-100 dark:hover:bg-[#333333]'
                      }`}
                    >
                      Western (C D E F...)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto px-6 py-8 w-full">

        {/* Base Sa selector - always visible */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gray-50 dark:bg-[#262626] rounded-full px-4 py-2">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-[#d4d4d4]">Base Sa</span>
            </div>
            <select
              id="base-sa"
              value={baseFrequency}
              onChange={(e) => setBaseFrequency(Number(e.target.value))}
              className="bg-white dark:bg-[#333333] pl-3 pr-8 py-1.5 rounded-full border-0 text-sm font-medium text-gray-900 dark:text-[#e5e5e5] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.25rem 1.25rem',
              }}
            >
              {BASE_FREQUENCIES.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Practice mode controls */}
        {mode === 'practice' && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {/* Pattern selector */}
            <select
              value={selectedPattern}
              onChange={(e) => {
                setSelectedPattern(e.target.value);
                if (isPlaying) stopAutoPlay();
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#262626] text-gray-900 dark:text-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 cursor-pointer"
            >
              {PATTERNS.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.name}
                </option>
              ))}
            </select>

            {/* Speed selector */}
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-[#262626]">
              {SPEED_OPTIONS.map((speed, index) => (
                <button
                  key={speed.label}
                  onClick={() => setSpeedIndex(index)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    speedIndex === index
                      ? 'bg-gray-900 dark:bg-[#e5e5e5] text-white dark:text-[#1a1a1a]'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#e5e5e5]'
                  }`}
                >
                  {speed.label}
                </button>
              ))}
            </div>

            {/* Play button */}
            <button
              onClick={togglePlay}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-700'
                  : 'bg-gray-900 dark:bg-[#e5e5e5] text-white dark:text-[#1a1a1a] hover:bg-gray-800 dark:hover:bg-[#d4d4d4]'
              }`}
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Keyboard */}
        <div className="mb-8">
          <SargamKeyboard
            activeNote={activeNote}
            onNoteStart={(note) => {
              if (isPlaying) stopAutoPlay();
              handleNoteStart(note);
            }}
            onNoteEnd={handleNoteEnd}
            keyLabels={currentMapping.display}
            noteDisplayMode={noteDisplayMode}
          />
        </div>

        {/* Sargam timeline */}
        <div className="mb-8">
          <SargamTimeline activeNote={activeNote} noteDisplayMode={noteDisplayMode} />
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-gray-400 dark:text-gray-500">
          <p>
            Keys: {keyMapping === 'sargam' ? 'S R G M P D N (⇧S for upper Sa)' : 'A S D F G H J K'}
          </p>
          {mode === 'practice' && <p>Space to play/stop</p>}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-400 dark:text-gray-500">
        <p>
          Built with{' '}
          <svg
            className="inline-block w-4 h-4 text-red-500 dark:text-red-600 -mt-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>{' '}
          by{' '}
          <a
            href="https://twitter.com/singhalkarun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#e5e5e5] transition-colors"
          >
            @singhalkarun
          </a>
        </p>
      </footer>
    </div>
  );
}
