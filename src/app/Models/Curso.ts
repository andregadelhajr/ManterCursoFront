import { Categoria } from "./Categoria";

export class Curso {
    cursoId: number;
    descricao: string;
    dtInicial: Date;
    dtFinal: Date;
    qtdAlunos: number;
    status: boolean;
    categoriaId: number;
    categoria: Categoria;
}