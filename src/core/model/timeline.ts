import type { TempoMap } from "./TempoMap";

export function buildTimeline(_notes: Note[], _tempoMap: TempoMap): TimelineEvent[] {
  throw new Error('not implemented');
}

interface Note {
  tick: number;
  durationTicks: number;
  pitch: number;
  trackId: number;
}

interface TimelineEvent {
  timeSec: number;
  durationSec: number;
  pitch: number;
  trackId: number;
}