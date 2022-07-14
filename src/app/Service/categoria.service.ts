import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Categoria } from 'src/app/Models/Categoria';


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

  PegarPeloId(categoriaId: number): Observable<Categoria>{
    const apiUrl  = `${this.url}/${categoriaId}`;
    return this.http.get<Categoria>(apiUrl)
  }

  //Salvar
  SalvarCategoria(categoria: Categoria): Observable<any>{
    return this.http.post<Categoria>(this.url, categoria, httpOptions);
  }

  //Atualizar
  AtualizarCategoria(categoria: Categoria): Observable<any> {
    const apiUrl  = `${this.url}/${categoria.categoriaId}`;
    return this.http.put<Categoria>(apiUrl, categoria, httpOptions);
  }

  //excluir
  ExcluirCategoria(categoriaId: number):Observable<any>{
    const apiUrl = `${this.url}/${categoriaId}`;
    return this.http.delete<Categoria>(apiUrl, httpOptions);
  }
}
