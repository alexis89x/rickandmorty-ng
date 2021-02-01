import { RMApiCharacter } from '../models/data.interface';

export function extractEpisodesFromCharacter(character: RMApiCharacter): number[] {
  return character.episode.map(r => parseInt(r.split('/').pop(), 10));
}

