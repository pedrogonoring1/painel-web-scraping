export class Breadcrumb {
  public tituloPagina: string;
  public paths: Array<{ nome: string;
                        link: string;
                        ativo: boolean;
                      }>

  constructor(params: Partial<Breadcrumb>) {
    this.tituloPagina = params.tituloPagina!;
    this.paths = params.paths!;
  }
}
