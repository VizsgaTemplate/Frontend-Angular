# Lépések
- ``ng new APPNEVE``
- ``cd .\APPNEVE\``
- ``ng add @ng-bootstrap/ng-bootstrap``
- ``ng g c OLDALNEVE1``
- ``ng g c OLDALNEVE2``

- Csinálj egy ``app-routing.module.ts``-t, az "app" mappába, ezzel a tartalommal:
```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OLDALNEVE1 } from './OLDALNEVE1/OLDALNEVE1.component';
import { OLDALNEVE2 } from './OLDALNEVE2/OLDALNEVE2.component';

const routes: Routes = [
  { path: '', component: OLDALNEVE1 },
  { path: 'ELÉRÉSIÚT', component: OLDALNEVE2 }, //pl: localhost:4200/ELÉRÉSIÚT lesz így
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```

- app.module.ts-be: 
```
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
```
és ugyanebbe: 
```
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
```

- Másold be a css, html fájlok tartalmait a komponensekbe!

- **Navigáció:**
OLDALNEVE1.component.ts elejére írd azt, hogy ``import { Router } from '@angular/router';``, majd bele:

 ```
  constructor(private router: Router) { }

  navigateToOldal2() {
    this.router.navigate(['/ELÉRÉSIÚT']);
  }
 ```
vagy
 ```
  constructor(private router: Router) { }
   
  navigateToOldal2() {
    this.router.navigate(['/ELÉRÉSIÚT'], { queryParams: { name: this.name, id: this.id } });
  }
 ```

 html:
 ``<button (click)="navigateToOldal2()">Go To the lobby</button>``

- Ha a navigáció vissza dob, akkor cseréld le az ``<a></a>`` tageket ``<button></button>``-ra!

- ``ng serve --open``

- Készítsd el a szükséges Modelleket pl (csak csinálj egy MODELL1.ts-t):
```
export class MODELL1 {
  id: number;
  name: string;
  
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
```

- ``ng generate service Services``

- Írd az elejére:

```
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MODELL1 } from './MODELL1';
```
majd bele:

```
  constructor(private http: HttpClient) { }

  getMODELL1(): Observable<MODELL1[]> {
    return this.http.get<any[]>('http://localhost:5000/api/ingatlanok').pipe(
      map(response => response.map(modell => new MODELL1(
        modell.id,
        modell.name
        )))
    );
  }
```

- A komponensekbe: 
```
import { Component, OnInit } from '@angular/core';
import { Ingatlan } from '../Ingatlan';
import { ServicesService } from '../services.service';

```

- A komponensbe, ahol kell az előbb írt getMODELL1:
```
export class OLDALNEVE1Component implements OnInit{
  modell1s!: MODELL1[];

  constructor(private service: Services) { }

  ngOnInit() {
    this.getMODELL1();
  }

  getMODELL1(): void {
    this.service.getMODELL1()
      .subscribe(data => {
        this.modell1s = data;
      });
  }
}
```

- A html file-ba példák:
```
  <h1 class="text-center">Ajánlataink</h1>
  <table class="table table-sm">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Név</th>
        <th scope="col">Fénykép</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let ingatlan of ingatlanok">
        <th scope="row">{{modell1s.id}}</th>
        <td>{{modell1s.nev}}</td>
        <td>{{modell1s.boolPélda?"Igen":"Nem"}}</td>
        <td> <img height="100px" src={{modell1s.kepUrl}}></td>
      </tr>
    </tbody>
  </table>
```

```
  <select class="form-select" name="kategoriaId">
      <option value="0">Kérem válasszon</option>
      <option *ngFor="let kategoria of kategoriak" value={{kategoria.id}}>{{kategoria.megnevezes}}</option>
  </select>
```

POST/PUT api használata:
- Minden mezőhöz csinálj ts-ben egy modelt, aminek a propertiet ngModel-lel köss bele pl:
Ts:
ezeket ne felejtsd el:
```
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
constructor(private http: HttpClient, private router: Router) { }
```

Html:
```
      <div class="mb-3">
        <label for="description" class="form-label">Ingatlan leírása</label>
        <textarea class="form-control" name="leiras" rows="3" [(ngModel)]="model.leiras"></textarea>
      </div>
```

Ts:

```
  model = {
    leiras: '',
    masJellemzoDatum: new Date().toISOString().substring(0, 10),
    MASIKOSZTALYID: 0
  }
```

Majd csinálj egy metódust, ami ezekkel meghívja az api-t, pl:
```
submitNewValami() {
    this.model.MASIKOSZTALYID = Number(this.model.MASIKOSZTALYID);// EZT EL NE FELEJTS, MERT 40 PERCIG KERESTEM MI A HIBA, (Át kell parsolni a stringet vissza number-ré)
    this.http.post<any>('http://localhost:5000/api/postvégpont', model).subscribe({
      next: () => this.router.navigate(['AHOVAAKAROD']),
      error: (err) => this.errorMessage = err.message
    })
```

Kell majd egy ilyen:
html:
```
        <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible" role="alert">
            <strong>{{errorMessage}}</strong>
            <button type="button" class="btn-close" (click)="errorMessage = ''"></button>
        </div>
```
ts:
```
  errorMessage!: string;
```

Majd a gombra kattintva hívd meg ezt a függvényt pl.:
```
      <div class="mb-3 text-center">
        <button class="btn btn-primary px-5" (click)="submitNewValami()">Küldés</button>
      </div>
```