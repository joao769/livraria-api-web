export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  anoPublicacao?: number;
  isbn?: string;
  genero: string;
  numeroPaginas?: number;
  descricao?: string;
  preco?: number;
  imagemUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}