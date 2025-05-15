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

  voltar() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.service.listar().subscribe((livros) => {
      this.exibirLivros = livros;
    })
  }

  excluir(id: number) {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        window.location.reload()
      })
    }
  }

  /*postsList: Ipost[] = [];

  readonly _livrosService = inject(LivrosService);

  ngOnInit(): void {
    this._livrosService.getPost().subscribe(
      (response) => {
        console.log('Response: ', response);
        this.postsList = response;
      }
    );
  }*/
}
