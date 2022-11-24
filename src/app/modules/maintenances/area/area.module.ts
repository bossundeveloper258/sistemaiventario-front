import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';



@NgModule({
  declarations: [AreaComponent],
  imports: [
    SharedModule,
    AreaRoutingModule
  ]
})
export class AreaModule { }
