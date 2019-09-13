import { Component, OnInit } from '@angular/core';
import { PinboardService } from '../services/pinboard.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(public _pinboardService: PinboardService) { }

  ngOnInit() {
    this._pinboardService.GetAllPins();
  }



}
