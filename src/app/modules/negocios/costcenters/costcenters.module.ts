import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CostcentersRoutingModule } from './costcenters-routing.module';
import { CostcentersComponent } from './costcenters.component';



@NgModule({
  declarations: [CostcentersComponent],
  imports: [
    SharedModule,
    CostcentersRoutingModule
  ]
})
export class CostcentersModule { }
