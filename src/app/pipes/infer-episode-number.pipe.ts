import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inferEpisodeNumber',
  pure: true
})
export class InferEpisodeNumberPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.split('/').pop();
  }

}
