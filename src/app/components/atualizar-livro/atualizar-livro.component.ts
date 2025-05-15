import { Component, NgModule, OnInit } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { Livro } from '../../services/types/types';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-atualizar-livro',
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './atualizar-livro.component.html',
  styleUrl: './atualizar-livro.component.css'
})
export class AtualizarLivroComponent implements OnInit {

  mensagemErro: string = '';

  generos = [
    { label: 'Romance' },
    { label: 'Ficção' },
    { label: 'Terror' },
    { label: 'Suspense' },
    { label: 'Autoajuda' },
    { label: 'Biografia' },
    { label: 'Fantasia' },
    { label: 'Aventura' },
    { label: 'Mistério' },
    { label: 'Histórico' },
    { label: 'Policial' },
    { label: 'Infantil' },
    { label: 'Juvenil' },
    { label: 'Drama' },
    { label: 'Humor' },
    { label: 'Poesia' },
    { label: 'Ficção Científica' },
    { label: 'Clássico' }
  ];

  formModified: any;

  ngOnInit(): void {
    this.initializeForm();
  }

  userForm: FormGroup = new FormGroup({});

  initializeForm() {
    this.userForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(250)]],
      autor: ['', [Validators.required, Validators.maxLength(250), Validators.pattern(/^[^\d]*$/)]],
      anoPublicacao: ['', [Validators.required, Validators.min(1500), Validators.max(new Date().getFullYear())]],
      isbn: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      genero: ['', [Validators.required]],
      numPaginas: ['', [Validators.required, Validators.min(0)]],
      descricao: ['', [Validators.required]],
      preco: ['', [Validators.required, Validators.min(0)]],
      imagemUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|gif)/)]],
    })
  }

  livroId?: number;

  livro: Livro = {} as Livro;

  tituloFormulario: string = 'Editar Livro';

  constructor(
    private fb: FormBuilder,
    private service: LivrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.livroId = Number(this.route.snapshot.params['id']);

    if (this.livroId) {
      this.service.buscarPorId(this.livroId).subscribe(livro => {
        if (livro) {
          this.userForm.patchValue({
            titulo: livro.titulo,
            autor: livro.autor,
            anoPublicacao: livro.anoPublicacao,
            isbn: livro.isbn,
            genero: livro.genero,
            numPaginas: livro.numPaginas,
            descricao: livro.descricao,
            preco: livro.preco,
            imagemUrl: livro.imagemUrl
          });
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/livros/listar']);
  }

  submeter() {
    if (this.userForm.valid && this.livroId) {
      this.service.editar({ id: this.livroId, ...this.userForm.value }).subscribe({
        next: () => {
          this.router.navigate(['/livros']);
        },
        error: (err) => {
          this.mensagemErro = err.error.message || 'Erro ao editar livro.';
        }
      });
    }
  }
}