import { Component, OnInit } from '@angular/core';
import { Livro } from '../../services/types/types';
import { LivrosService } from '../../services/livros.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-listar-livro',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './listar-livros.component.html',
  styleUrl: './listar-livros.component.css'
})
export class ListarLivrosComponent implements OnInit {
  constructor(
    private service: LivrosService,
    private router: Router
  ) {}

  livrosPorPagina = 10;
  paginaAtual = 1;
  totalPaginas = 1;
  listaCompleta: Livro[] = [];
  listaLivros: Livro[] = [];
  paginas: number[] = [];

  ngOnInit(): void {
    this.service.listar().subscribe((livros) => {
      this.listaCompleta = livros;
      this.totalPaginas = Math.ceil(livros.length / this.livrosPorPagina);
      this.paginas = Array(this.totalPaginas).fill(0).map((_, i) => i + 1);
      this.atualizarListaVisivel();
    });
  }

  atualizarListaVisivel() {
    const inicio = (this.paginaAtual - 1) * this.livrosPorPagina;
    const fim = inicio + this.livrosPorPagina;
    this.listaLivros = this.listaCompleta.slice(inicio, fim);
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarListaVisivel();
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarListaVisivel();
    }
  }

  irParaPagina(pagina: number) {
    this.paginaAtual = pagina;
    this.atualizarListaVisivel();
  }

  excluir(id: number): void {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        this.listaCompleta = this.listaCompleta.filter(livro => livro.id !== id);
        this.totalPaginas = Math.ceil(this.listaCompleta.length / this.livrosPorPagina);
        this.paginas = Array(this.totalPaginas).fill(0).map((_, i) => i + 1);

        if (this.paginaAtual > this.totalPaginas) {
          this.paginaAtual = this.totalPaginas;
        }

        this.atualizarListaVisivel();
      });
    }
  }
}
