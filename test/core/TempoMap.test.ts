import { describe, it, expect } from 'vitest';
import { TempoMap } from '../../src/core/model/TempoMap';

const PPQ = 480;

describe('TempoMap', () => {
  it('should convert ticks to seconds at a constant tempo', () => {
    const tempoEvent = { tick: 0, bpm: 120 };
    const tempoMap = new TempoMap({ tempoEvents: [tempoEvent], ppq: PPQ, endTick: 10_000 });

    const timeInSeconds = tempoMap.tickToSeconds(480);

    expect(timeInSeconds).toEqual(0.5)
  })

  it('should convert seconds to ticks at a constant tempo', () => {
    const tempoEvent = { tick: 0, bpm: 120 };
    const tempoMap = new TempoMap({ tempoEvents: [tempoEvent], ppq: PPQ, endTick: 10_000 });

    const ticks = tempoMap.secondsToTick(0.5);

    expect(ticks).toEqual(480);
  })

  it('should convert ticks to seconds across a tempo change', () => {
    const tempoEvents = [{ tick: 0, bpm: 120 }, { tick: 960, bpm: 60 }];
    const tempoMap = new TempoMap({ tempoEvents, ppq: PPQ, endTick: 10_000 });

    const timeInSeconds = tempoMap.tickToSeconds(1440);

    expect(timeInSeconds).toEqual(2.0)
  })

  it('should convert seconds to ticks across a tempo change', () => {
    const tempoEvents = [{ tick: 0, bpm: 120 }, { tick: 960, bpm: 60 }];
    const tempoMap = new TempoMap({ tempoEvents, ppq: PPQ, endTick: 10_000 });

    const ticks = tempoMap.secondsToTick(2.0);

    expect(ticks).toEqual(1440);
  })

  it('should report the total duration in seconds', () => {
    const tempoMap = new TempoMap({
      tempoEvents: [{ tick: 0, bpm: 120 }],
      ppq: 480,
      endTick: 960,
    })

    const fullDurationInSeconds = tempoMap.totalSeconds

    expect(fullDurationInSeconds).toEqual(1.0)
  })
})