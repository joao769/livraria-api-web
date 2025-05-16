import { Routes } from '@angular/router';
import { CriarLivroComponent } from './components/criar-livro/criar-livro.component';
import { HomeComponent } from './components/home/home.component';
import { ExibirLivrosComponent } from './components/exibir-livros/exibir-livros.component';
import { ListarLivroComponent } from './components/listar-livro/listar-livro.component';
import { AtualizarLivroComponent } from './components/atualizar-livro/atualizar-livro.component';
import { LivroDetalheComponent } from './components/livro-detalhe/livro-detalhe.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'livros',
        component: ExibirLivrosComponent,
        title: 'Exibir livros'
    },
    {
        path: 'livros/listar',
        component: ListarLivroComponent,
        title: 'Listar livros'
    },
    {
        path: 'livros/adicionar',
        component: CriarLivroComponent,
        title: 'Livros - Adicionar'
    },
    {
        path: 'livros/alterar/:id',
        component: AtualizarLivroComponent,
        title: 'Livros - Alterar'
    },
    {
        path: 'livros/:id',
        component: LivroDetalheComponent 
    },
];
