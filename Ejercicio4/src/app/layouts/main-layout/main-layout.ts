import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { Footer } from '../../components/footer/footer';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [Header, NavBar, Footer,RouterModule, CommonModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
