import { Component } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { Livro } from '../../services/types/types';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-livro-detalhe',
  imports: [NgIf],
  templateUrl: './livro-detalhe.component.html',
  styleUrl: './livro-detalhe.component.css'
})
export class LivroDetalheComponent {

  exibirLivro?: Livro;

  constructor(
    private service: LivrosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.buscarPorId(+id).subscribe((dados) => {
        this.exibirLivro = dados;
      });
    }
  }
}