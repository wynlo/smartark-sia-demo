import { Component, OnInit } from '@angular/core';
import { PinboardService } from '../services/pinboard.service';
import { PartComponentRetrieveService } from '../services/part-component-retrieve.service';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-pinboard',
  templateUrl: './pinboard.component.html',
  styleUrls: ['./pinboard.component.css']
})
export class PinboardComponent implements OnInit {

  constructor(
    public _pinboardService: PinboardService,
    public _partRetrievalService: PartComponentRetrieveService,
    public _inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this._pinboardService.GetCurrentBoard();
    this._pinboardService.GetPinsByPart();
    this._partRetrievalService.getAllParts();
  }

  public graph = {
    data: [
      {
        x: ['Green', 'Red'],
        y: [1, 4],
        marker: {
          color: ['green','red']
        },
        type: 'bar'
      },
    ],
    layout: {width: 400, height: 300, title: ''},
    config: {
      displayModeBar: false,
      staticPlot: true,
      responsive: true,
    },
  };

  private OnPinOpen(id) {
    this._pinboardService.GetPinById(id);
    // this._partRetrievalService.getAllParts();
    this._partRetrievalService.getComponentsByPart(this._pinboardService.openPin.part);
  }

  private OnInventoryOpen(partName) {
    this._inventoryService.inventorySelectedByComponent = null;
    this._inventoryService.getInventoryForPart(partName);
  }

  private InventoryDropdownChange(event) {
    var componentName = event.target.value;
    if (componentName != "") {
      this._inventoryService.getInventoryForComponent(componentName);
    } else {
      this._inventoryService.inventorySelectedByComponent = null;
    }
  }

}
