import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/Models/Categoria';
import { CategoriaService } from 'src/app/Service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias : Categoria[];
  formulario: any;
  tituloFormulario: string;
  tituloModalExclusao: string;
  excluirId: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  constructor(private toastr: ToastrService,  private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.ListarCategorias();
  }

  ListarCategorias(): void {
    this.categoriaService.ListarCategorias().subscribe((resultado) => {
      this.categorias = resultado;
    });
  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela=false;
    this.visibilidadeFormulario=true;

    this.tituloFormulario = 'Nova categoria';

    this.formulario = new FormGroup({
      //forms controle são os inputs
      nome: new FormControl(null)
    });
  }

  ExibirFormularioAtualizacao(categoriaId): void {
    this.visibilidadeTabela=false;
    this.visibilidadeFormulario=true;

    this.categoriaService.PegarPeloId(categoriaId).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.nome}`;

      this.formulario = new FormGroup({
         //forms controle são os inputs
        categoriaId: new FormControl(resultado.categoriaId),
        nome: new FormControl(resultado.nome)
      });
    }); 
  }


  EnviarFormulario(): void{
    const categoria: Categoria = this.formulario.value;
    
    if(this.formulario.valid)
    {

      if(categoria.categoriaId>0){
        this.categoriaService.AtualizarCategoria(categoria).subscribe(resultado=> {
          this.visibilidadeFormulario=false;
          this.visibilidadeTabela=true;
          // alert('Curso Atualizado com sucesso');
          this.toastr.warning('Atualizado!', 'Atualizado com Sucesso!');
          this.categoriaService.ListarCategorias().subscribe((registros) => {
            this.ListarCategorias();
            this.categorias = registros;
          });
        }, error => {
          this.toastr.error(error.message);
          console.log(error);
        });
      }
      else {
  
        this.categoriaService.SalvarCategoria(categoria).subscribe((resultado) =>{
          this.visibilidadeTabela=true;
          this.visibilidadeFormulario=false;
          // alert('Curso inserido com sucesso');
          this.categoriaService.ListarCategorias().subscribe(registros=> {
            this.toastr.success('Cadastrado!', 'Cadastrado com Sucesso!');
            this.categorias= registros;
            this.ListarCategorias();
          })
        }, error => {
          this.toastr.error(error.message);
          console.log(error);
        });
  
      }
    } else {
      this.toastr.error('Preencha todos os campos obrigatórios', 'Error');
    }

  }

  ExibirTituloExclusao(categoriaId): void {
    this.categoriaService.PegarPeloId(categoriaId).subscribe(resultado => {
      this.tituloModalExclusao = ` ${resultado.nome} `;
    }); 
  }

  PegarIdExclusao(cursoId: number) {
    this.excluirId = cursoId;
  }

  ExcluirCategoria(CategoriaId) {
    this.categoriaService.ExcluirCategoria(CategoriaId).subscribe((resultado)=> {
      this.visibilidadeFormulario=false;
      this.visibilidadeTabela=true;
      // alert('Curso removido com sucesso');
      this.toastr.error("Categoria Excluida com Sucesso!", "Excluido!");
      this.categoriaService.ListarCategorias().subscribe(registros => {
      this.categorias = registros;
      this.ListarCategorias();
      });
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    });
  }

  voltar(): void{
    this.visibilidadeTabela=true;
    this.visibilidadeFormulario=false;
  }

}
