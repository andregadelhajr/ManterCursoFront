import { CursoService } from 'src/app/Service/curso.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/Models/Curso';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/Models/Categoria';
import { CategoriaService } from 'src/app/Service/categoria.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  formulario: any;
  tituloFormulario: string;
  dados: string;
  private _filtroLista : string;
  buscaForm: FormGroup;
  cursoForm: FormGroup;

  tituloModalExclusao: string;
  dtInicial: string;
  dtFinal: string;
  qtdAlunos: string;
  status: string;
  categoriaId: string;

  cursos : Curso[];
  categorias : Categoria[];
  cursosFiltrados: Curso[];
  errors: string[];
  cursoId : number;
  excluirId: number;
  dtInicialFiltro: any;
  dtFinalFiltro: any;
  dataAtual: any = new Date();

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  constructor(private cursoService: CursoService, private toastr: ToastrService,  private fb: FormBuilder, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.ListarCursos();
    this.ListarCategorias();

    this.cursoForm = this.fb.group({
      descricao: [null, Validators.required],
      dtInicial: [null, Validators.required],
      dtFinal: [null, Validators.required],
      categoriaId: [null, Validators.required],
    });

    this.buscaForm = this.fb.group({
      dtInicialFiltro : [],
      dtFinalFiltro : [],
      busca: []
    })
  }

  ListarCursos(): void 
  {
    this.cursoService.PegarTodosCursosAtivos().subscribe((resultado) => 
    {
      this.cursos = resultado;
      this.cursosFiltrados = this.cursos;
    });
  }

  ListarCategorias(): void {
    this.categoriaService.ListarCategorias().subscribe((resultado) => {
      this.categorias = resultado;
    });
  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela=false;
    this.visibilidadeFormulario=true;

    this.tituloFormulario = 'Novo curso';

    this.cursoForm = new FormGroup({
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

    this.cursoService.PegarPeloId(cursoId).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.descricao}`;

      this.cursoForm = new FormGroup({
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
    const curso: Curso = this.cursoForm.value;
    
    if(this.cursoForm.valid)
    {

      if(curso.cursoId>0){
        this.cursoService.AtualizarCurso(curso).subscribe(resultado=> {
          this.visibilidadeFormulario=false;
          this.visibilidadeTabela=true;
          // alert('Curso Atualizado com sucesso');
          this.toastr.warning('Atualizado!', 'Atualizado com Sucesso!');
          this.cursoService.PegarTodos().subscribe((registros) => {
            this.ListarCursos();
            this.cursos = registros;
          });
        }, error => {
          console.log(error.error.errors);
          this.errors = error.errors;
          this.toastr.error(error.error.errors, 'Error');
        });
      }
      else { 
  
        this.cursoService.SalvarCurso(curso).subscribe((resultado) =>{
          this.visibilidadeTabela=true;
          this.visibilidadeFormulario=false;
          // alert('Curso inserido com sucesso');
          this.cursoService.PegarTodos().subscribe(registros=> {
            this.toastr.success('Cadastrado!', 'Cadastrado com Sucesso!');
            this.cursos= registros;
            this.ListarCursos();
          })
        }, error => {
          console.log(error.error.errors);
          this.errors = error.errors;
          this.toastr.error(error.error.errors, 'Error');
        });
  
      }
    } else {
      this.toastr.error('Preencha todos os campos obrigatórios', 'Error');
    }

  }

  PegarIdExclusao(cursoId: number) {
    this.excluirId = cursoId;
  }

  ExibirTituloExclusao(cursoId): void {
    this.cursoService.PegarPeloId(cursoId).subscribe(resultado => {
      this.tituloModalExclusao = ` ${resultado.descricao} `;
    }); 
  }

  ExibirDadosExclusao(cursoId): void {
    this.cursoService.PegarPeloId(cursoId).subscribe(resultado => {
      this.dtInicial = `Data Inicial: ${resultado.dtInicial}`;
      this.dtFinal = `Data Final: ${resultado.dtFinal}`;
      this.qtdAlunos = `Quantidade de Alunos: ${resultado.qtdAlunos}`;
      this.status = `Ativo: ${resultado.status}`;
      this.categoriaId = `Categoria: ${resultado.categoriaId}`;
    }); 
  }

  ExcluirCurso(CursoId) {
    this.cursoService.ExcluirCurso(CursoId).subscribe((resultado)=> {
      this.visibilidadeFormulario=false;
      this.visibilidadeTabela=true;
      // alert('Curso removido com sucesso');
      this.toastr.error("Curso finalizado com Sucesso!", "Finalizado!");
      this.cursoService.PegarTodos().subscribe(registros => {
      this.cursos = registros;
      this.ListarCursos();
      });
    }, error => {
      this.toastr.error('Ação Proibida!', 'Curso já finalizado!');
      console.log(error);
    });
  }

  voltar(): void{
    this.visibilidadeTabela=true;
    this.visibilidadeFormulario=false;
  }

  //Filtro Descriçao

  public get filtroLista(){
    return this._filtroLista;
  }

  filtrarCursos(filtrar: string): any{
    filtrar = filtrar.toLocaleLowerCase();
    return this.cursos.filter(
      (curso: {descricao:string}) => curso.descricao.toLocaleLowerCase().indexOf(filtrar)!== -1
    );
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.cursosFiltrados = this.filtroLista ? this.filtrarCursos(this.filtroLista) : this.cursos;
  }

  //Filtro Data

  filtroData(){

    if(this.dtInicialFiltro > this.dtFinalFiltro && this.dtFinalFiltro )
    {
      this.toastr.error('Data final não pode ser menor que a data inicial');

    } else if(this.dtInicialFiltro && !this.dtFinalFiltro)
    {
      this.ListarCursos();
    }   
    else if (this.dtInicialFiltro && !this.dtFinalFiltro)
    {
      this.filtrarCursodtInicial(this.dtInicialFiltro);
    }
    else if (this.dtInicialFiltro && this.dtFinalFiltro)
    {
      this.filtrarCursodtFinal(this.dtFinalFiltro);
    }
    else 
    {
      this.filtrarCursodtInicialFinal(this.dtInicialFiltro, this.dtFinalFiltro)
    }
  }

  filtrarCursodtInicial(dtInicial: any) : any
  {
    this.cursosFiltrados = this.cursos.filter(resultado =>{
      return resultado.dtInicial >= dtInicial || resultado.dtFinal >= dtInicial
    });
  }

  filtrarCursodtFinal(dtFinal: any) : any
  {
    this.cursosFiltrados = this.cursos.filter(resultado =>{
      return resultado.dtInicial <= dtFinal || resultado.dtFinal <= dtFinal
    });
  }

  filtrarCursodtInicialFinal(dtInicial:any, dtFinal: any) : any
  {
    this.cursosFiltrados = this.cursos.filter(resultado =>{
      return (resultado.dtInicial >= dtInicial || resultado.dtFinal >= dtInicial) && (resultado.dtInicial <= dtFinal || resultado.dtFinal <= dtFinal)
    });
  }

  LimparFiltro(){
    this.buscaForm.reset();
    this.ListarCursos();
  }

}
