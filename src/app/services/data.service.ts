import { Injectable } from '@angular/core';
import { RMApiCharacterResult, RMApiResult, RMCharacter } from '../models/data.interface';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Observable } from 'rxjs';

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
    return this.http.get<RMApiResult>(url);
  }
}
