'use client';

import { SARGAM_NOTES, SARGAM_TO_WESTERN, type SargamNote, type NoteDisplayMode } from './AudioEngine';

interface SargamKeyboardProps {
  activeNote: SargamNote | null;
  onNoteStart: (note: SargamNote) => void;
  onNoteEnd: (note: SargamNote) => void;
  keyLabels: Record<SargamNote, string>;
  noteDisplayMode?: NoteDisplayMode;
  disabled?: boolean;
}

export default function SargamKeyboard({
  activeNote,
  onNoteStart,
  onNoteEnd,
  keyLabels,
  noteDisplayMode = 'sargam',
  disabled = false,
}: SargamKeyboardProps) {
  return (
    <div className="flex justify-center gap-2">
      {SARGAM_NOTES.map((note) => {
        const isActive = activeNote === note;
        return (
          <button
            key={note}
            disabled={disabled}
            onMouseDown={() => !disabled && onNoteStart(note)}
            onMouseUp={() => !disabled && onNoteEnd(note)}
            onMouseLeave={() => !disabled && isActive && onNoteEnd(note)}
            onTouchStart={(e) => {
              e.preventDefault();
              if (!disabled) onNoteStart(note);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              if (!disabled) onNoteEnd(note);
            }}
            className={`
              w-14 h-16 rounded-lg border transition-all duration-100
              flex flex-col items-center justify-center gap-1
              select-none touch-none
              ${
                isActive
                  ? 'bg-gray-900 dark:bg-[#e5e5e5] text-white dark:text-[#1a1a1a] border-gray-900 dark:border-[#e5e5e5]'
                  : 'bg-white dark:bg-[#262626] text-gray-900 dark:text-[#e5e5e5] border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span className="text-lg font-medium">
              {noteDisplayMode === 'western' ? SARGAM_TO_WESTERN[note] : note}
            </span>
            <span className={`text-xs ${isActive ? 'text-gray-300 dark:text-[#737373]' : 'text-gray-400 dark:text-gray-500'}`}>
              {keyLabels[note]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
