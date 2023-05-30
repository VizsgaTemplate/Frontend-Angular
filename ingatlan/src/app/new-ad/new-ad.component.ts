import { Component, OnInit  } from '@angular/core';
import { ServicesService } from '../services.service';
import { Kategoria } from '../Kategoria';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit  {
  kategoriak: Kategoria[]=[];
  model = {
    kategoriaId: 0,
    leiras: '',
    hirdetesDatuma: new Date().toISOString().substring(0, 10),   
    tehermentes: true,
    kepUrl: ''
  }
  errorMessage!: string;
  constructor(private service: ServicesService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getKategoriak();
  }

  getKategoriak(): void {
    this.service.getKategoriak()
      .subscribe(data => {
        this.kategoriak = data;
      });
  }
  submitNewAd() {
    this.model.kategoriaId = Number(this.model.kategoriaId);
    this.http.post<any>('http://localhost:5000/api/ujingatlan', this.model).subscribe({
      next: () => this.router.navigate(['offers']),
      error: (err) => this.errorMessage = err.message
    })
  }
}
