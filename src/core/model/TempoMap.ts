export class TempoMap {
  constructor(_input: TempoTrack) {}

  tickToSeconds(_tick: number): number {
    throw new Error('not implemented');
  }

  secondsToTick(_seconds: number): number {
    throw new Error('not implemented');
  }
}

interface TempoEvent {
  tick: number;
  bpm: number;
}

interface TempoTrack {
  tempoEvents: TempoEvent[];
  ppq: number;
  endTick: number;
}
