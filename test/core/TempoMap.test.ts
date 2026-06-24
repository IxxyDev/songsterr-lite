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
})