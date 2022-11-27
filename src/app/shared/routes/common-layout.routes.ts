import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'maintenances',
        loadChildren: () => import('../../modules/maintenances/maintenances.module').then(m => m.MaintenancesModule),
    },
    {
        path: 'negocios',
        loadChildren: () => import('../../modules/negocios/negocios.module').then(m => m.NegociosModule),
    },
    {
        path: 'activos',
        loadChildren: () => import('../../modules/activos/activos.module').then(m => m.ActivosModule),
    }
];