import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartComponentRetrieveService {

  public currentParts = null;
  public currentComponents = null;

  constructor() { }

  private partsToComponents =
  {
    'turbofan':['spool1','spool2','spool3','support','casing','combustor_ring','stators','propeller','propeller_hub'],
    'landing gear':['wheels','tbc','tbc'],
    'wings':['left wing','tbc'],
  }

  getComponentsByPart(part: string) {
    this.currentComponents = this.partsToComponents[part];
  }

  getAllParts() {
    this.currentParts = [];
    for (var key in this.partsToComponents) {
      this.currentParts.push(key);
    }
  }

}
