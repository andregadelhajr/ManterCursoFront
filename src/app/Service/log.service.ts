import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Log } from 'src/app/Models/Log';


const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  url = 'https://localhost:5001/api/Logs';

  constructor(private http: HttpClient) { }

  ListarLogs(): Observable<Log[]>
  {
    return this.http.get<Log[]>(this.url, httpOptions)
  }
}
