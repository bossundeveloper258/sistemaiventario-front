import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

const antdModule = [
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzToolTipModule,
    NzTableModule,
    NzSwitchModule,
    NzModalModule,
    NzFormModule,
    NzInputModule
]

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        PerfectScrollbarModule,
        ReactiveFormsModule,
        SearchPipe,
        ...antdModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        PerfectScrollbarModule,
        ReactiveFormsModule,
        ...antdModule
    ],
    declarations: [
        SearchPipe
    ],
    providers: [
        ThemeConstantService
    ]
})

export class SharedModule { }
