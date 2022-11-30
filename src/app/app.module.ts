import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US, es_ES } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common';
import en from '@angular/common/locales/en';
import es from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { ThemeConstantService } from './shared/services/theme-constant.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptor/token.interceptor';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(en);
registerLocaleData(es);
@NgModule({
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        FullLayoutComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NzBreadCrumbModule,
        HttpClientModule,
        TemplateModule
    ],
    providers: [
        { 
            provide: NZ_I18N,
            // useValue: en_US,
            useFactory: (localId: string) => {
                switch (localId) {
                  case 'en':
                    return en_US;
                  /** keep the same with angular.json/i18n/locales configuration **/
                  case 'es':
                    return es_ES;
                  default:
                    return en_US;
                }
            },
            deps: [LOCALE_ID]
        },
        {
            provide: LocationStrategy, 
            useClass: PathLocationStrategy
        },
        ThemeConstantService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
