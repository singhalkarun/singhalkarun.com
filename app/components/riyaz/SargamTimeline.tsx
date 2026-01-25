'use client';

import { useEffect, useRef, useCallback } from 'react';
import { SARGAM_NOTES, SARGAM_TO_WESTERN, type SargamNote, type NoteDisplayMode } from './AudioEngine';

interface SargamTimelineProps {
  activeNote: SargamNote | null;
  noteDisplayMode?: NoteDisplayMode;
}

interface NoteBlock {
  note: SargamNote;
  startTime: number;
  endTime: number | null;
}

const TIMELINE_DURATION = 5000; // 5 seconds visible

const NOTE_COLORS: Record<SargamNote, string> = {
  'Sa': '#3b82f6',   // blue
  'Re': '#8b5cf6',   // violet
  'Ga': '#ec4899',   // pink
  'Ma': '#f97316',   // orange
  'Pa': '#eab308',   // yellow
  'Dha': '#22c55e',  // green
  'Ni': '#14b8a6',   // teal
  "Sa'": '#6366f1',  // indigo
};

export default function SargamTimeline({
  activeNote,
  noteDisplayMode = 'sargam',
}: SargamTimelineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noteBlocksRef = useRef<NoteBlock[]>([]);
  const lastActiveNoteRef = useRef<SargamNote | null>(null);
  const animationRef = useRef<number | null>(null);

  // Track note blocks
  useEffect(() => {
    const now = Date.now();

    if (activeNote && activeNote !== lastActiveNoteRef.current) {
      // End the previous note if there was one (handles direct note transitions in practice mode)
      if (lastActiveNoteRef.current) {
        const lastBlock = noteBlocksRef.current[noteBlocksRef.current.length - 1];
        if (lastBlock && lastBlock.endTime === null) {
          lastBlock.endTime = now;
        }
      }
      // New note started
      noteBlocksRef.current.push({
        note: activeNote,
        startTime: now,
        endTime: null,
      });
    } else if (!activeNote && lastActiveNoteRef.current) {
      // Note ended (no new note following)
      const lastBlock = noteBlocksRef.current[noteBlocksRef.current.length - 1];
      if (lastBlock && lastBlock.endTime === null) {
        lastBlock.endTime = now;
      }
    }

    lastActiveNoteRef.current = activeNote;
  }, [activeNote]);

  // Animation loop
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const now = Date.now();

    const laneHeight = height / 8;
    const padding = 40; // Left padding for labels

    // Clear canvas
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, width, height);

    // Draw lane backgrounds and labels
    SARGAM_NOTES.forEach((note, index) => {
      const y = (7 - index) * laneHeight; // Reverse so Sa is at bottom

      // Alternate lane colors
      ctx.fillStyle = index % 2 === 0 ? '#f5f5f5' : '#fafafa';
      ctx.fillRect(padding, y, width - padding, laneHeight);

      // Lane divider
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, y + laneHeight);
      ctx.lineTo(width, y + laneHeight);
      ctx.stroke();

      // Note label
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      const noteName = noteDisplayMode === 'western' ? SARGAM_TO_WESTERN[note] : note;
      ctx.fillText(noteName, padding - 8, y + laneHeight / 2);
    });

    // Draw vertical time line (current position)
    const currentX = width - 60;
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(currentX, 0);
    ctx.lineTo(currentX, height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Clean up old note blocks
    const cutoff = now - TIMELINE_DURATION;
    noteBlocksRef.current = noteBlocksRef.current.filter(
      block => (block.endTime || now) > cutoff
    );

    // Draw note blocks
    noteBlocksRef.current.forEach(block => {
      const noteIndex = SARGAM_NOTES.indexOf(block.note);
      const y = (7 - noteIndex) * laneHeight;

      const startX = padding + ((block.startTime - (now - TIMELINE_DURATION)) / TIMELINE_DURATION) * (width - padding);
      const endX = padding + (((block.endTime || now) - (now - TIMELINE_DURATION)) / TIMELINE_DURATION) * (width - padding);

      // Only draw if visible
      if (endX > padding && startX < width) {
        const drawStartX = Math.max(startX, padding);
        const drawEndX = Math.min(endX, width);

        ctx.fillStyle = NOTE_COLORS[block.note];
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.roundRect(drawStartX, y + 4, drawEndX - drawStartX, laneHeight - 8, 4);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });

    // Draw "now" label
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('now', currentX, height - 4);

    animationRef.current = requestAnimationFrame(draw);
  }, [noteDisplayMode]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw]);

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg border border-gray-200"
        style={{ width: '100%', height: '280px' }}
      />
    </div>
  );
}
