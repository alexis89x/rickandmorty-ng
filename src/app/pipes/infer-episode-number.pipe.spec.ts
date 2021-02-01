import { InferEpisodeNumberPipe } from './infer-episode-number.pipe';

describe('InferEpisodeNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new InferEpisodeNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
