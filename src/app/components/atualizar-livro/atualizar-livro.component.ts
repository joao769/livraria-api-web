import { Component } from '@angular/core';
import { Livro } from '../../services/types/types';
import { LivrosService } from '../../services/livros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-atualizar-livro',
  imports: [FormsModule],
  templateUrl: './atualizar-livro.component.html',
  styleUrl: './atualizar-livro.component.css'
})
export class AtualizarLivroComponent {

  generos = [
    { label: 'Romance' },
    { label: 'Ficção' },
    { label: 'Terror' },
    { label: 'Suspense' },
    { label: 'Autoajuda' },
    { label: 'Biografia' },
  ];

  livroId?: number;

  livro: Livro = {} as Livro;

  tituloFormulario: string = 'Editar Livro';

  constructor(private service: LivrosService,
    private router: Router,
    private route: ActivatedRoute) {

    this.livroId = Number(this.route.snapshot.params['id']);

    if (this.livroId) {
      this.service.buscarPorId(this.livroId).subscribe(livro => {
        if (livro) {
          this.livro = livro;
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/livros/listar']);
  }

  submeter() {
    this.service.editar(this.livro).subscribe(() => {
      this.router.navigate(['/livros']);
    });
  }
}
