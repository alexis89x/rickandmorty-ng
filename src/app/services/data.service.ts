import { Injectable } from '@angular/core';
import { RMApiCharacterResult, RMApiResult, RMCharacter } from '../models/data.interface';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Observable } from 'rxjs';
import { debounce, throttleTime } from 'rxjs/operators';

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
    return new Observable<RMApiResult>(observer => {
      this.http.get<RMApiResult>(url)
        .pipe(throttleTime(500))
        .subscribe(resp => {
          observer.next(resp);
        });
    });
  }
}
