export class MercadoResponse {
    _id: string;
    Nome: string;
    LinkImage: string;
    UrlSite: string;
  
    constructor(params: Partial<MercadoResponse>) {
      this._id = params._id!;
      this.Nome = params.Nome!;
      this.LinkImage = params.LinkImage!;
      this.UrlSite = params.UrlSite!;
    }
  }
  