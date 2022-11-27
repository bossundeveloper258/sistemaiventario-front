import { NgModule } from '@angular/core';
import { ComputerComponent } from './computer.component';
import { ComputerRoutingModule } from './computer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComputerFormComponent } from './computer-form/computer-form.component';



@NgModule({
  declarations: [ComputerComponent, ComputerFormComponent],
  imports: [
    SharedModule,
    ComputerRoutingModule
  ]
})
export class ComputerModule { }
