import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Curso } from 'src/app/Models/Curso';


const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  url = 'https://localhost:5001/api/cursos';

  constructor(private http: HttpClient){}

    //Listar
    PegarTodos(): Observable<Curso[]>{
      return this.http.get<Curso[]>(this.url);
    }

    //Listar Ativos
    PegarTodosCursosAtivos():  Observable<Curso[]>{
      const apiUrl = `${this.url}/ativos`;
      return this.http.get<Curso[]>(apiUrl, httpOptions);
    }

    PegarTodosCursosFinalizados():  Observable<Curso[]>{
      const apiUrl = `${this.url}/finalizados`;
      return this.http.get<Curso[]>(apiUrl, httpOptions);
    }

    //Listar por Id
    PegarPeloId(cursoId: number): Observable<Curso>{
      const apiUrl  = `${this.url}/${cursoId}`;
      return this.http.get<Curso>(apiUrl)
    }

    //Salvar
    SalvarCurso(curso: Curso): Observable<any>{
      return this.http.post<Curso>(this.url, curso, httpOptions);
    }

    //Atualizar
    AtualizarCurso(curso: Curso): Observable<any> {
      const apiUrl  = `${this.url}/${curso.cursoId}`;
      return this.http.put<Curso>(apiUrl, curso, httpOptions);
    }

    //excluir
    ExcluirCurso(cursoId: number):Observable<any>{
      const apiUrl = `${this.url}/${cursoId}`;
      return this.http.delete<Curso>(apiUrl, httpOptions);
  }

}
