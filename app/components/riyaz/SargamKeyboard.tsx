'use client';

import { SARGAM_NOTES, type SargamNote } from './AudioEngine';

interface SargamKeyboardProps {
  activeNote: SargamNote | null;
  onNoteStart: (note: SargamNote) => void;
  onNoteEnd: (note: SargamNote) => void;
  keyLabels: Record<SargamNote, string>;
  disabled?: boolean;
}

export default function SargamKeyboard({
  activeNote,
  onNoteStart,
  onNoteEnd,
  keyLabels,
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
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span className="text-lg font-medium">{note}</span>
            <span className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>
              {keyLabels[note]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
