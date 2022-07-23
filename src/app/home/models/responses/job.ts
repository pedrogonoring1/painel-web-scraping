export class JobResponse {
  Nome: string;
  Ativo: boolean;

  constructor(params: Partial<JobResponse>) {
    this.Nome = params.Nome!;
    this.Ativo = params.Ativo!;
  }
}
