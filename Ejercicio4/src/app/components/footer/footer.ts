import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  appName = 'Epico Ultra Mega Increible Ultimate Absolute Baby Application';
  year = new Date().getFullYear();
}
