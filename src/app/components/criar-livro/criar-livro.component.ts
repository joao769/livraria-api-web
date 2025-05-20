import { Component, OnInit } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { Livro } from '../../services/types/types';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-criar-livro',
  imports: [FormsModule, ReactiveFormsModule],
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
      titulo: ['', [Validators.required, Validators.maxLength(250), this.noOnlySpacesValidator, this.noLeadingTrailingSpacesValidator]],
      autor: ['', [Validators.required, Validators.maxLength(250), Validators.pattern(/^[^\d]*$/), this.noOnlySpacesValidator, this.noLeadingTrailingSpacesValidator]],
      anoPublicacao: ['', [Validators.required, Validators.min(1500), Validators.max(new Date().getFullYear())]],
      isbn: ['', [Validators.required, Validators.pattern(/^(?:\d{9}[\dXx]|\d{13})$/), this.noOnlySpacesValidator]],
      genero: ['', [Validators.required]],
      numPaginas: ['', [Validators.required, Validators.min(1)]],
      descricao: ['', [Validators.required, Validators.maxLength(1000), this.noOnlySpacesValidator, this.noLeadingTrailingSpacesValidator]],
      preco: ['', [Validators.required, Validators.min(0), Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      imagemUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/)]],
    })
  }

  noOnlySpacesValidator(control: AbstractControl) {
    const isValid = control.value && control.value.trim().length > 0;
    return isValid ? null : { onlySpaces: true };
  }

  noLeadingTrailingSpacesValidator(control: AbstractControl) {
    const value = control.value;
    if (value && (value !== value.trim())) {
      return { leadingTrailingSpaces: true };
    }
    return null;
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