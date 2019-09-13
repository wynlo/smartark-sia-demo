import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }


  public partSelectedName = null;
  public inventorySelectedByPart = null;

  public componentSelectedName = null;
  public inventorySelectedByComponent = null;

  private isInitialized = false;

  private sampleInventory =
    {
      'turbofan': {},
      'wings':{},
      'landing gear':{}
    }



  private initializeInventory() {
    var componentNames =
      ['turbine_spool_1','turbine_spool_2','propeller_spool','control_box_1','control_box_2','control_box_3',
       'casing', 'combustor_ring','exhaust_valve_1','exhaust_valve_2','front_bracket_1','front_bracket_2',
       'front_fuel_pipe_1','front_fuel_pipe_2','fuel_pipe_filter','propeller','propeller_spool','rear_cone',
       'monitoring_unit_1','monitoring_unit_2','monitoring_unit_3','stators','supports'];

    var scope = this;
    componentNames.forEach(function(component) {
      scope.sampleInventory['turbofan'][component] = { 'a': Math.floor(Math.random() * 10) , 'b': Math.floor(Math.random() * 10) , 'c': Math.floor(Math.random() * 10) };
    })

    this.sampleInventory['wings']['wings'] = { 'a': Math.floor(Math.random() * 10) , 'b': Math.floor(Math.random() * 10) , 'c': Math.floor(Math.random() * 10) };
    this.sampleInventory['landing gear']['wheels'] = { 'a': Math.floor(Math.random() * 10) , 'b': Math.floor(Math.random() * 10) , 'c': Math.floor(Math.random() * 10) };

  }

  public getInventoryForPart(partName: string) {
      if (this.isInitialized == false) {
        this.initializeInventory();
        this.isInitialized = true;
      }
      this.partSelectedName = partName;
      this.inventorySelectedByPart = this.sampleInventory[this.partSelectedName];
  }

  public getInventoryForComponent(componentName: string) {
      if (this.isInitialized == false) {
        this.initializeInventory();
        this.isInitialized = true;
      }
      this.componentSelectedName = componentName;
      this.inventorySelectedByComponent = this.sampleInventory[this.partSelectedName][componentName];
      // console.log(this.inventorySelectedByComponent);
  }
}
