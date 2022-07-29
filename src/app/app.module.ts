import { CUSTOM_ELEMENTS_SCHEMA, NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MercadoModule } from './mercados/mercado.module';
import { ConfirmBoxConfigModule, DialogConfigModule, NgxAwesomePopupModule, ToastNotificationConfigModule } from '@costlydeveloper/ngx-awesome-popup';
import {MatCardModule} from '@angular/material/card';
import { ProdutoModule } from './produtos/produto.module';
import { ProdutoMercadoModule } from './produtos-mercados/produto-mercado.module';
import { CurrencyFormatPipe } from './shared/pipes/currency';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';


registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    CurrencyFormatPipe
  ],
  imports: [
    AppRoutingModule,
    HomeModule,
    MercadoModule,
    ProdutoModule,
    ProdutoMercadoModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    ToastrModule.forRoot(),
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(),
    MatCardModule,
    MatAutocompleteModule,
    AutocompleteLibModule,
    NgSelectModule,
    FormsModule,
    MatButtonModule
    ],
  exports: [NgxSpinnerModule],
  providers: [
    BsModalService,
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    }
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
