import { Component, OnInit, inject } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { Livro } from '../../services/types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-livros',
  imports: [],
  templateUrl: './exibir-livros.component.html',
  styleUrls: ['./exibir-livros.component.css'],
  standalone: true
})
export class ExibirLivrosComponent implements OnInit {


  exibirLivros: Livro[] = [];

  constructor(private service: LivrosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listar().subscribe((livros) => {
      this.exibirLivros = livros;
    })
  }
}
