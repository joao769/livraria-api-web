import { Component, NgModule, OnInit } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { Livro } from '../../services/types/types';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-criar-livro',
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './criar-livro.component.html',
  styleUrls: ['./criar-livro.component.css']
})
export class CriarLivroComponent implements OnInit {

  generos = [
    { label: 'Romance' },
    { label: 'Ficção' },
    { label: 'Terror' },
    { label: 'Suspense' },
    { label: 'Autoajuda' },
    { label: 'Biografia' },
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
    if (this.userForm.valid) {
      const livro: Livro = this.userForm.value;
      this.service.adicionar(livro).subscribe(() => {
        this.router.navigate(['/livros']);
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
