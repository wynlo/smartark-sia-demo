import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';



@Injectable({
  providedIn: 'root'
})
export class TreeTwinService {

  constructor(private router: Router) { }

  private nodes = [
    {
      id: 1,
      name: 'SMT203 (Boeing 787)',
      children: [
        { id: 2, name: 'Turbofan', url:'/twin/turbofan' },
        { id: 3, name: 'Landing Gear', url:'/twin/landinggear' },
        { id: 4, name: 'TBC' },
        { id: 5, name: 'TBC' },
      ]
    }
  ];

  private actionMapping:IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {
        var url = node.data.url;
        if (url)
          // window.location.href = url;
          this.router.navigateByUrl(url);
      }
    }
  }

 private options: ITreeOptions = {
    actionMapping: this.actionMapping
  };

  public getNodes() {
    return this.nodes;
  }

  public getOptions() {
    return this.options;
  }

}
