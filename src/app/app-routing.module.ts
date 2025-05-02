import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarLivroComponent } from './components/criar-livro/criar-livro.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'criar', component: CriarLivroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
