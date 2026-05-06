import { Routes } from '@angular/router';
import { NavBar } from './modules/components/nav-bar/nav-bar';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main/home',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: NavBar,
        children: [
            {
                path: 'home',
                loadComponent: () => import('./modules/pages/main/main').
                then(m => m.Main)
            },
            {
                path: 'passengers',
                loadComponent: () => import('./modules/pages/passengers/passengers').
                then(m => m.Passengers)
            },
            {
                path: 'flights',
                loadComponent: () => import('./modules/pages/flights/flights').
                then(m => m.Flights)
            }
        ]

    }
];
