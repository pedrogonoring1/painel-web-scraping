import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from 'src/app/home/services/home.service';
import { JobResponse } from 'src/app/home/models/responses/job';

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
  private jobResponse: Array<JobResponse>;

  constructor(private homeService: HomeService, private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.recuperarStatusJob()
  }

  public async alterarStatusJob(event: any) {
    try {
      this.checked = event.checked;
      this.statusExecucaoJob();
      await this.homeService.alterarStatusJob();
      this.toastr.info(`Job ${this.labelStatusExecucaoJob}`, 'Status Alterado');
    } catch (error) {
      this.toastr.error('Falha ao alterar status', 'Erro')
    }
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
    try {
      this.spinner.show()
        this.jobResponse = await this.homeService.recuperarStatusJob()
        this.checked = this.jobResponse[0].Ativo
        this.statusExecucaoJob()
        this.spinner.hide()
    } catch (error) {
      this.spinner.hide()
      this.toastr.error('Falha ao recuperar status do Job', 'Erro')
    }
    }
}
