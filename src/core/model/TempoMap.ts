const SECONDS_IN_MINUTE = 60

export class TempoMap {
  private readonly segments: Segment[];
  private readonly endTick: number;

  constructor(input: TempoTrack) {
    this.segments = buildSegments(input);
    this.endTick = input.endTick;
  }

  get totalSeconds(): number {
    return this.tickToSeconds(this.endTick)
  }

  tickToSeconds(tick: number): number {
    const segment = this.segments.findLast(s => s.startTick <= tick);
    if (!segment) {
      throw new Error(`No tempo segment for tick ${tick}`);
    }
    
    return segment.startSeconds + (tick - segment.startTick) * segment.secondsPerTick;
  }

  secondsToTick(seconds: number): number {
    const segment = this.segments.findLast(s => s.startSeconds <= seconds);
    if (!segment) {
      throw new Error(`No tempo segment for seconds ${seconds}`);
    }

    return segment.startTick + (seconds - segment.startSeconds) / segment.secondsPerTick;
  }
}

function buildSegments({ tempoEvents, ppq, endTick }: TempoTrack): Segment[] {
  const segments: Segment[] = [];
  let accumulatedSeconds = 0;

  for (let i = 0; i < tempoEvents.length; i++) {
    const event = tempoEvents[i];
    const secondsPerTick = SECONDS_IN_MINUTE / (ppq * event.bpm);

    segments.push({
      startTick: event.tick,
      startSeconds: accumulatedSeconds,
      secondsPerTick,
    });

    const nextTick = i + 1 < tempoEvents.length ? tempoEvents[i + 1].tick : endTick;
    accumulatedSeconds += (nextTick - event.tick) * secondsPerTick;
  }

  return segments;
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

interface Segment {
  startTick: number,
  startSeconds: number,
  secondsPerTick: number
}