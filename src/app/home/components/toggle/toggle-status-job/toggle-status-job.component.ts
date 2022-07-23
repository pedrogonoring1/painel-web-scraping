import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from 'src/app/home/services/home.service';

@Component({
  selector: 'app-toggle-status-job',
  templateUrl: './toggle-status-job.component.html',
  styleUrls: ['./toggle-status-job.component.css']
})
export class ToggleStatusJobComponent implements OnInit {
  public checked: boolean;
  public color: ThemePalette = 'primary';
  public disabled = false;
  public labelStatusExecucaoJob: string;

  constructor(private homeService: HomeService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.recuperarStatusJob()

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  public alterarStatusJob(event: any) {
    this.checked = event.checked;
    this.statusExecucaoJob();
  }

  public statusExecucaoJob() {
    if(this.checked == true) {
      this.labelStatusExecucaoJob = 'Em atividade';
    }
    else {
      this.labelStatusExecucaoJob = 'Pausado';
    }
  }

  public async recuperarStatusJob() {
    await this.homeService.recuperarStatusJob().subscribe(data => {
      this.checked = data[0].Ativo
      this.statusExecucaoJob()
    })
  }

}
