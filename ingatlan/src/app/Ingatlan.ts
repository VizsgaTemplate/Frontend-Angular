export class Ingatlan {
    id: number;
    kategoriaId: number;
    kategoriaNev: string;
    leiras: string;
    hirdetesDatuma: Date;
    tehermentes: boolean;
    kepUrl: string;
    constructor(id: number,
        kategoriaId: number,
        kategoriaNev: string,
        leiras: string,
        hirdetesDatuma: Date,
        tehermentes: boolean,
        kepUrl: string) {
      this.id = id;
      this.kategoriaId = kategoriaId;
      this.kategoriaNev = kategoriaNev;
      this.leiras = leiras;
      this.hirdetesDatuma = hirdetesDatuma;
      this.tehermentes = tehermentes;
      this.kepUrl = kepUrl;
    }
  }