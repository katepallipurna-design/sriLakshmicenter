import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header.component';
import { FooterComponent } from './shared/layout/footer.component';
import { BRAND } from './core/config/brand.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly brand = BRAND;

  /** WhatsApp deep link (works on mobile + desktop web) */
  protected readonly whatsappHref = `https://wa.me/${String(BRAND.whatsapp).replace(/\D/g, '')}`;

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
