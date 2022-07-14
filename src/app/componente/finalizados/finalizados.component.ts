import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/Models/Curso';
import { CursoService } from 'src/app/Service/curso.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

  cursos: Curso [];

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.cursoService.PegarTodosCursosFinalizados().subscribe((resultado) => 
    {
      this.cursos = resultado;
    });
  }

}
