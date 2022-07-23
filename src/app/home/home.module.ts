import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ToggleStatusJobComponent } from './components/toggle/toggle-status-job/toggle-status-job.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    HomePageComponent,
    ToggleStatusJobComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatSlideToggleModule],
})
export class HomeModule {}
