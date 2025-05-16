import { Component, OnInit } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { Livro } from '../../services/types/types';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-livro',
  imports: [FormsModule, ReactiveFormsModule ],
  templateUrl: './criar-livro.component.html',
  styleUrls: ['./criar-livro.component.css']
})
export class CriarLivroComponent implements OnInit {

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
      imagemUrl: ['', [Validators.required]],
    })
  }

  livro: Livro = {} as Livro;

  tituloFormulario: string = 'Adicionar Livro';

  constructor(
    private fb: FormBuilder,
    private service: LivrosService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  cancelar() {
    this.router.navigate(['/livros']);
  }

  submeter() {
    if (this.userForm.invalid) {
      return;
    }

    this.service.adicionar(this.userForm.value).subscribe({
      next: () => {
        this.router.navigate(['/livros']);
      },
      error: (err) => {
        this.mensagemErro = err.error.message || 'Erro ao adicionar livro.';
      }
    });
  }
}