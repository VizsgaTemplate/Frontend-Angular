import { Injectable } from '@angular/core';
import { Ingatlan } from './Ingatlan';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Kategoria } from './Kategoria';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
  getIngatlanok(): Observable<Ingatlan[]> {
    return this.http.get<any[]>('http://localhost:5000/api/ingatlan').pipe(
      map(response => response.map(ingatlan => new Ingatlan(
        ingatlan.id,
        ingatlan.kategoriaId,
        ingatlan.kategoriaNev,
        ingatlan.leiras,
        ingatlan.hirdetesDatuma,
        ingatlan.tehermentes,
        ingatlan.kepUrl
        )))
    );
  }

  getKategoriak(): Observable<Kategoria[]> {
    return this.http.get<any[]>('http://localhost:5000/api/kategoriak').pipe(
      map(response => response.map(kategoria => new Kategoria(
        kategoria.id,
        kategoria.megnevezes
        )))
    );
  }
}
