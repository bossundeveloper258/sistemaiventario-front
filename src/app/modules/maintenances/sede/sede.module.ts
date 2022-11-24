import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedeComponent } from './sede.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SedeRoutingModule } from './sede-routing.module';



@NgModule({
  declarations: [SedeComponent],
  imports: [
    SharedModule,
    SedeRoutingModule
  ]
})
export class SedeModule { }
