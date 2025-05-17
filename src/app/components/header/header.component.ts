import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  exibirLogo: boolean = true;

  itensMenu = [
    { label: 'Home', link: '' },
    { label: 'Vizualizar', link: '/livros' },
    { label: 'Adiconar', link: '/livros/adicionar' },
    { label: 'Alterar', link: '/livros/listar' },
  ]

  menuAberto = false;

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
}