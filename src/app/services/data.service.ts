import { Injectable } from '@angular/core';
import { RMApiCharacter, RMApiEpisode, RMApiResult, RMCharacter } from '../models/data.interface';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Observable } from 'rxjs';
import { debounce, throttleTime } from 'rxjs/operators';
import { extractEpisodesFromCharacter } from '../utils/episode.utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseApiUrl = 'https://rickandmortyapi.com/api';

  private episodeMap = {};

  constructor(
    private http: HttpClient
  ) {}

  getCharacters(page: number = 1): Observable<RMApiResult> {
    const url = `${this.baseApiUrl}/character?page=${page}`;
    return new Observable<RMApiResult>(observer => {
      this.http.get<RMApiResult>(url)
        .pipe(throttleTime(500))
        .subscribe(resp => {
          observer.next(resp);
        });
    });
  }

  getEpisodes(episodesList: number[]): Observable<RMApiEpisode[]> {
    // Obtain required episode list by filtering already p
    const url = `${this.baseApiUrl}/episode/${episodesList.join(',')}`;
    return this.http.get<RMApiEpisode[]>(url);
  }
/*
  getEpisodesFromCharacters(characterList: RMApiCharacter[]): Observable<RMApiEpisode[]>  {
    const requiredEpisodeList = new Set(
      ...characterList.map(extractEpisodesFromCharacter)
    );
    console.log(requiredEpisodeList);
  }

  https://rickandmortyapi.com/api/episode/

 */
}
