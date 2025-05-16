import { Component, OnInit } from '@angular/core';
import { Livro } from '../../services/types/types';
import { LivrosService } from '../../services/livros.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-livro',
  imports: [RouterLink],
  templateUrl: './listar-livros.component.html',
  styleUrl: './listar-livros.component.css'
})
export class ListarLivrosComponent implements OnInit {


  listaLivros: Livro[] = [];

  constructor(private service: LivrosService,
    private router: Router
  ) { }

  voltar() {
    this.router.navigate(['/livros']);
  }

  ngOnInit(): void {
    this.service.listar().subscribe((livros) => {
      this.listaLivros = livros;
    })
  }

  excluir(id: number) {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        window.location.reload()
      })
    }
  }
}
