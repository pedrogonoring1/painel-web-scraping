export class LogResponse {
  public Data: Date;
  public Tipo: string;
  public Descricao: string;
  public Stack?: string;

  constructor(params: Partial<LogResponse>) {
    this.Data = params.Data!;
    this.Tipo = params.Tipo!;
    this.Descricao = params.Descricao!;
    this.Stack = params.Stack!;
  }
}
