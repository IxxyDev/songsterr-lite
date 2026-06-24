const SECONDS_IN_MINUTE = 60

export class TempoMap {
  private readonly input: TempoTrack;

  constructor(input: TempoTrack) {
    this.input = input;
  }

  tickToSeconds(tick: number): number {
    const { bpm } = this.input.tempoEvents[0];
    const secondsPerTick = SECONDS_IN_MINUTE / (this.input.ppq * bpm);
    return tick * secondsPerTick;
  }

  secondsToTick(seconds: number): number {
    const { bpm } = this.input.tempoEvents[0];
    const secondsPerTick = SECONDS_IN_MINUTE / (this.input.ppq * bpm);
    return seconds / secondsPerTick;
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
