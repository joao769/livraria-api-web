import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  private ignoreUnload = false;

  constructor() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.closest('.ignore-beforeunload')) {
        this.ignoreUnload = true;
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent) {
    if (this.ignoreUnload) {
      this.ignoreUnload = false;
      return;
    }

    event.preventDefault();
    event.returnValue = '';
  }
}
