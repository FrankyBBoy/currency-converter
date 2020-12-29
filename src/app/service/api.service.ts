import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly listQuoteuUrl = 'https://currency-exchange.p.rapidapi.com/listquotes';
  private readonly exchangeUrl = 'https://currency-exchange.p.rapidapi.com/exchange';
  private readonly host = 'currency-exchange.p.rapidapi.com';
  private readonly apiKey = 'a0c145d012mshde8b9fc3eadaa81p1b3a51jsn095b6e8f3fe2';

  constructor(private httpClient: HttpClient) { }

  getListQuote(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.listQuoteuUrl, {
      headers: { "x-rapidapi-key": this.apiKey,
                 "x-rapidapi-host": this.host,
                 "useQueryString": 'true' }
    });
  }

  getExhange(from: string, to: string): Observable<number> {
    return this.httpClient.get<number>(this.exchangeUrl, {
      headers: { "x-rapidapi-key": this.apiKey,
                 "x-rapidapi-host": this.host,
                 "useQueryString": 'true' },
      params: { "from": from,
                "to": to}                 
    });
  }

}
