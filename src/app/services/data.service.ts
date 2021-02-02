import { Injectable } from '@angular/core';
import { RMApiEpisode, RMApiResult } from '../models/data.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseApiUrl = 'https://rickandmortyapi.com/api';

  constructor(
    private http: HttpClient
  ) {}

  getCharacters(page: number = 1): Observable<RMApiResult> {
    const url = `${this.baseApiUrl}/character?page=${page}`;
    // Not necessary, just in case you want to do some operations on the result
    return new Observable<RMApiResult>(observer => {
      this.http.get<RMApiResult>(url)
        .subscribe(resp => {
          observer.next(resp);
        });
    });
  }

  getEpisodes(episodesList: number[]): Observable<RMApiEpisode[]> {
    // TODO Implement internal map && error handling
    const url = `${this.baseApiUrl}/episode/${episodesList.join(',')}`;
    return this.http.get<RMApiEpisode[]>(url);
  }
}
