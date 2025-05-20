import { Component, OnInit, inject } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { Livro } from '../../services/types/types';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listar-livros',
  imports: [RouterLink],
  templateUrl: './exibir-livros.component.html',
  styleUrls: ['./exibir-livros.component.css'],
})
export class ExibirLivrosComponent implements OnInit {

  exibirLivros: Livro[] = [];

  constructor(
    private service: LivrosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listar().subscribe((livros) => {
      this.exibirLivros = livros;
    })
  }
}
