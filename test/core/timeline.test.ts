import { describe, it, expect } from "vitest";
import { TempoMap } from "../../src/core/model/TempoMap";
import { buildTimeline } from "../../src/core/model/timeline";

describe('timeline', () => {
  it('should place a note at its time with its duration in seconds', () => {
    const tempoMap = new TempoMap({
      tempoEvents: [{ tick: 0, bpm: 120 }],
      ppq: 480,
      endTick: 10_000,
    });
    const notes = [{ tick: 0, durationTicks: 480, pitch: 60, trackId: 0 }];

    const timeline = buildTimeline(notes, tempoMap);

    expect(timeline).toEqual([{ timeSec: 0, durationSec: 0.5, pitch: 60, trackId: 0 }])
  })

  it('should sort events by time', () => {
    const tempoMap = new TempoMap({
      tempoEvents: [{ tick: 0, bpm: 120 }],
      ppq: 480,
      endTick: 10_000,
    });
    const notes = [
      { tick: 480, durationTicks: 480, pitch: 60, trackId: 0 },
      { tick: 0, durationTicks: 480, pitch: 60, trackId: 0 }
    ];

    const timeline = buildTimeline(notes, tempoMap);

    expect(timeline).toEqual([
      { timeSec: 0, durationSec: 0.5, pitch: 60, trackId: 0 },
      { timeSec: 0.5, durationSec: 0.5, pitch: 60, trackId: 0 }
    ])
  })

  it('should respect tempo change inside the note', () => {
    const tempoMap = new TempoMap({
      tempoEvents: [{ tick: 0, bpm: 120 }, { tick: 960, bpm: 60 }],
      ppq: 480,
      endTick: 10_000,
    });
    const notes = [{ tick: 480, durationTicks: 960, pitch: 64, trackId: 0 }]

    const timeline = buildTimeline(notes, tempoMap);

    expect(timeline).toEqual([
      { timeSec: 0.5, durationSec: 1.5, pitch: 64, trackId: 0 },
    ])
  })
})