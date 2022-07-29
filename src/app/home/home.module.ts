import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ToggleStatusJobComponent } from './components/toggle/toggle-status-job/toggle-status-job.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    HomePageComponent,
    ToggleStatusJobComponent
  ],
  imports: [MatSlideToggleModule, MatCardModule, MatProgressBarModule, ReactiveFormsModule, CommonModule],
})
export class HomeModule {}
