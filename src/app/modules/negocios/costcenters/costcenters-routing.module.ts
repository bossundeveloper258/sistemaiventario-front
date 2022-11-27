import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostcentersComponent } from './costcenters.component';

const routes: Routes = [
    {
        path: '',
        component: CostcentersComponent,
        data: {
            headerDisplay: "none"
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CostcentersRoutingModule { }