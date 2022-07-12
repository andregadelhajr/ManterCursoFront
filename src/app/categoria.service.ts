import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Categoria } from './Categoria';


const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  
  url = 'https://localhost:5001/api/Categorias';

  constructor(private http: HttpClient) { }

  ListarCategorias(): Observable<Categoria[]>
  {
    return this.http.get<Categoria[]>(this.url, httpOptions)
  }
}
