import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComputerFormComponent } from './computer-form/computer-form.component';
import { ComputerComponent } from './computer.component';


const routes: Routes = [
    {
        path: '',
        component: ComputerComponent,
        data: {
            headerDisplay: "none"
        }
    },
    {
        path: 'new',
        component: ComputerFormComponent,
        data: {
            headerDisplay: "none"
        }
    },
    {
        path: 'edit/:id',
        component: ComputerFormComponent,
        data: {
            headerDisplay: "none"
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComputerRoutingModule { }