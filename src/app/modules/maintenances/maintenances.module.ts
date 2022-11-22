import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MaintenancesRoutingModule } from './maintenances-routing.module';

import { NzCardModule } from 'ng-zorro-antd/card';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [],
  imports: [
    MaintenancesRoutingModule
  ],
  exports: []
})
export class MaintenancesModule { }
