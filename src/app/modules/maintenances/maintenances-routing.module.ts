import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    },
    {
        path: 'businesses',
        loadChildren: () => import('./businesses/businesses.module').then(m => m.BusinessesModule),
    },
    {
        path: 'sedes',
        loadChildren: () => import('./sede/sede.module').then(m => m.SedeModule),
    },
    {
        path: 'areas',
        loadChildren: () => import('./area/area.module').then(m => m.AreaModule),
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MaintenancesRoutingModule { }