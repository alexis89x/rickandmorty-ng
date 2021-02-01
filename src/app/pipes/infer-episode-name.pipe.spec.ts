import { InferEpisodeNamePipe } from './infer-episode-name.pipe';

describe('InferEpisodeNamePipe', () => {
  it('create an instance', () => {
    const pipe = new InferEpisodeNamePipe();
    expect(pipe).toBeTruthy();
  });
});
