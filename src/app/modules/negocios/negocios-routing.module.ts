import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'costcenters',
        loadChildren: () => import('./costcenters/costcenters.module').then(m => m.CostcentersModule),
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NegociosRoutingModule { }