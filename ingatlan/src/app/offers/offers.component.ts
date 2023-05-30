import { Component, OnInit } from '@angular/core';
import { Ingatlan } from '../Ingatlan';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  ingatlanok: Ingatlan[]=[];

  constructor(private service: ServicesService) { }

  ngOnInit() {
    this.getIngatlanok();
  }

  getIngatlanok(): void {
    this.service.getIngatlanok()
      .subscribe(data => {
        this.ingatlanok = data;
      });
  }
}
