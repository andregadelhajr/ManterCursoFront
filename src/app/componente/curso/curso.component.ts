import { CursoService } from 'src/app/curso.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Curso } from 'src/app/Curso';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  formulario: any;
  tituloFormulario!: string;
  cursos : Curso[];
  cursoId : number;
  

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  constructor(private cursoService: CursoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cursoService.PegarTodos().subscribe(resultado=>
      this.cursos = resultado);
  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela=false;
    this.visibilidadeFormulario=true;

    this.tituloFormulario = 'Novo curso';

    this.formulario = new FormGroup({
      //forms controle são os inputs
      descricao: new FormControl(null),
      dtInicial: new FormControl(null),
      dtFinal: new FormControl(null),
      qtdAlunos: new FormControl(null),
      status: new FormControl(true),
      categoriaId: new FormControl(null)
    });
  }

  ExibirFormularioAtualizacao(cursoId): void {
    this.visibilidadeTabela=false;
    this.visibilidadeFormulario=true;

    this.cursoService.PegarPeloId(cursoId).subscribe(resultado=> {
      this.tituloFormulario = `Atualizar ${resultado.descricao}`;

      this.formulario = new FormGroup({
         //forms controle são os inputs
        cursoId: new FormControl(resultado.cursoId),
        descricao: new FormControl(resultado.descricao),
        dtInicial: new FormControl(resultado.dtInicial),
        dtFinal: new FormControl(resultado.dtFinal),
        qtdAlunos: new FormControl(resultado.qtdAlunos),
        status: new FormControl(true),
        categoriaId: new FormControl(resultado.categoriaId)
      });
    }); 
  }


  EnviarFormulario(): void{
    const curso: Curso = this.formulario.value;
    
    if(curso.cursoId>0){
      this.cursoService.AtualizarCurso(curso).subscribe(resultado=> {
        this.visibilidadeFormulario=false;
        this.visibilidadeTabela=true;
        alert('Curso Atualizado com sucesso');
        this.cursoService.PegarTodos().subscribe((registros) => {
          this.cursos = registros;
        });
      });
    }
    else {

      this.cursoService.SalvarCurso(curso).subscribe((resultado) =>{
        this.visibilidadeTabela=true;
        this.visibilidadeFormulario=false;
        // alert('Curso inserido com sucesso');
        this.toastr.success('Cadastrado!', 'Cadastrado com Sucesso!');
        this.cursoService.PegarTodos().subscribe(registros=> {
          this.cursos= registros
        })
      
      });

    }
  }

  ExcluirCurso(CursoId) {
    this.cursoService.ExcluirCurso(CursoId).subscribe((resultado)=> {
      this.visibilidadeFormulario=false;
      this.visibilidadeTabela=true;
      // alert('Curso removido com sucesso');
      this.toastr.error("Curso será finalizado", "Finalizado!");
      this.cursoService.PegarTodos().subscribe(registros => {
      this.cursos = registros;
      });
    });
  }

  voltar(): void{
    this.visibilidadeTabela=true;
    this.visibilidadeFormulario=false;
  }

}
