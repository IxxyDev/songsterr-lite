import type { TempoMap } from "./TempoMap";

export function buildTimeline(notes: Note[], tempoMap: TempoMap): TimelineEvent[] {
  return notes.map(note => {
    const timeSec = tempoMap.tickToSeconds(note.tick);
    const endSec = tempoMap.tickToSeconds(note.tick + note.durationTicks);
    return {
      timeSec,
      durationSec: endSec - timeSec,
      pitch: note.pitch,
      trackId: note.trackId
    };
  })
    .toSorted((a, b) => a.timeSec - b.timeSec);
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
