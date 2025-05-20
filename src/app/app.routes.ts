import { Routes } from '@angular/router';
import { CriarLivroComponent } from './components/criar-livro/criar-livro.component';
import { HomeComponent } from './components/home/home.component';
import { ExibirLivrosComponent } from './components/exibir-livros/exibir-livros.component';
import { ListarLivrosComponent } from './components/listar-livros/listar-livros.component';
import { AtualizarLivroComponent } from './components/atualizar-livro/atualizar-livro.component';
import { LivroDetalhesComponent } from './components/livro-detalhes/livro-detalhes.component';

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
        component: ListarLivrosComponent,
        title: 'Listar livros'
    },
    {
        path: 'livros/adicionar',
        component: CriarLivroComponent,
        title: 'Adicionar Livros'
    },
    {
        path: 'livros/alterar/:id',
        component: AtualizarLivroComponent,
        title: 'Alterar Livros'
    },
    {
        path: 'livros/:id',
        component: LivroDetalhesComponent,
        title: 'Detalhe do Livro'
    },
];
