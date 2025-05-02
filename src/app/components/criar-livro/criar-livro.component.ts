import { Component } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { Livro } from '../../services/types/types';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-criar-livro',
  imports: [FormsModule],
  templateUrl: './criar-livro.component.html',
  styleUrls: ['./criar-livro.component.css']
})
export class CriarLivroComponent {

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

  tituloFormulario: string = 'Adicionar Livro';

  constructor(private service: LivrosService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  cancelar() {
    this.router.navigate(['/livros']);
  }

  submeter() {
    this.service.adicionar(this.livro).subscribe(() => {
      this.router.navigate(['/livros']);
    });
  }
}
