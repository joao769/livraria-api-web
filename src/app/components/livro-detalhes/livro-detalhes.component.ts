import { Component } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { Livro } from '../../services/types/types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livro-detalhes',
  imports: [],
  templateUrl: './livro-detalhes.component.html',
  styleUrl: './livro-detalhes.component.css'
})
export class LivroDetalhesComponent {

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