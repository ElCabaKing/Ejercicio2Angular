import { Component } from '@angular/core';



@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
})
export class FooterComponent {
  public actualYear: number = new Date().getFullYear();
  public copirightMessage: string = '';
  public buttonMessagge: string = 'Generar mensaje de copyright';

  generateMessage(): void {
    if(this.copirightMessage) {
      this.copirightMessage = '';
      this.buttonMessagge = 'Generar mensaje de copyright';
      return;
    }
    this.copirightMessage = `© ${this.actualYear} David Cabanilla. Todos los derechos reservados.`;
    this.buttonMessagge = 'Ocultar mensaje de copyright';
    return;
  }
}
