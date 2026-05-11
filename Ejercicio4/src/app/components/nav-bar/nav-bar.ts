import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {}
