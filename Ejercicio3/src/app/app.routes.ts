import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'employees',
        loadComponent: () => 
            import('./modules/employee/employee/employee').then(
                m => m.Employee)
    },
    {
        path: 'departments',
        loadComponent: () => 
            import('./modules/departament/departament/departament').then(
                m => m.Departament)
    },
    {
        path: 'main',
        loadChildren: () => 
            import('./modules/main/main-module').then(
                m => m.MainModule)
    }
];
