import { Routes } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: 'main',
        component: MainLayout,
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home').
                    then(m => m.Home)
            },
            {
                path: 'students',
                loadComponent: () => import('./pages/students/students').
                    then(m => m.Students)
            },
            {
                path: 'courses',
                loadComponent: () => import('./pages/courses/courses').
                    then(m => m.Courses)
            }]
    },
    {
        path: '',
        redirectTo: 'main/home',
        pathMatch: 'full'
    }
];
