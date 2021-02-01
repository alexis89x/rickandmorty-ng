import { Pipe, PipeTransform } from '@angular/core';
import { RMApiEpisode } from '../models/data.interface';

@Pipe({
  name: 'inferEpisodeName',
  pure: true
})
export class InferEpisodeNamePipe implements PipeTransform {

  transform(value: string, episodeList: RMApiEpisode[]): unknown {
    const episodeId = parseInt(value.split('/').pop(), 10);
    return episodeList.find(r => r.id === episodeId).name;
  }

}
