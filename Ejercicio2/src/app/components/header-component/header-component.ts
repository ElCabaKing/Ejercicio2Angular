import { Component } from '@angular/core';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  public title: string = 'Epico Proyecto';
  public studentName: string = 'David Cabanilla';
  public isOnline: boolean = true;
}
