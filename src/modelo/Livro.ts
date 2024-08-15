// src/modelo/Livro.ts
import { Editora } from './Editora';

export class Livro {
  public codigo: number;
  public codEditora: number;
  public titulo: string;
  public resumo: string;
  public autores: string[];

  constructor(codigo: number, codEditora: number, titulo: string, resumo: string, autores: string[]) {
    this.codigo = codigo;
    this.codEditora = codEditora;
    this.titulo = titulo;
    this.resumo = resumo;
    this.autores = autores;
  }
}
