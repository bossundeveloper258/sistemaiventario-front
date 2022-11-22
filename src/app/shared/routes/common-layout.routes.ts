import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'maintenances',
        loadChildren: () => import('../../modules/maintenances/maintenances.module').then(m => m.MaintenancesModule),
    }
];