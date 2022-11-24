import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BusinessesRoutingModule } from './businesses-routing.module';
import { BusinessesComponent } from './businesses.component';



@NgModule({
  declarations: [
    BusinessesComponent
  ],
  imports: [
    SharedModule,
    BusinessesRoutingModule
  ]
})
export class BusinessesModule { }
