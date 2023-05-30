import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-open-page',
  templateUrl: './open-page.component.html',
  styleUrls: ['./open-page.component.css']
})
export class OpenPageComponent {

  constructor(private router: Router) { }

  GoToOffers() {
    this.router.navigate(['/offers']);
  }
  GoToNewAds() {
    this.router.navigate(['/newad']);
  }
}
