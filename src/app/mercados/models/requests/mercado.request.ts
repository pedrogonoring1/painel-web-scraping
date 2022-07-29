export class MercadoRequest {
  Nome: string;
  LinkImage: string;
  UrlSite: string;

  constructor(params: Partial<MercadoRequest>) {
    this.Nome = params.Nome!;
    this.LinkImage = params.LinkImage!;
    this.UrlSite = params.UrlSite!;
  }
}
