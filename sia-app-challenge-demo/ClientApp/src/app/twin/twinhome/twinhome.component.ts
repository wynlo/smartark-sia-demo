import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';


@Component({
  selector: 'app-twinhome',
  templateUrl: './twinhome.component.html',
  styleUrls: ['../twin.component.css']
})
export class TwinhomeComponent implements OnInit {

  uploadedFile = null;
  showFileUpload = true;
  componentFound = null;

  constructor(private router: Router) { }

  private nodes = [
    {
      id: 1,
      name: 'SMT203 (Boeing 787)',
      children: [
        { id: 2, name: 'Turbofan', url:'/twin/turbofan' },
        { id: 3, name: 'Landing Gear' },
        { id: 4, name: 'TBC' },
        { id: 5, name: 'TBC' },
      ]
    }
  ];

  private actionMapping:IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {
        var url = node.data.url;
        if (url) {
          // window.location.href = url;
          // get modal backdrops
            const modalsBackdrops = document.getElementsByClassName('modal-backdrop');

            // remove every modal backdrop
            for(let i=0; i<modalsBackdrops.length; i++) {
              document.body.removeChild(modalsBackdrops[i]);
            }
          this.router.navigateByUrl(url);
        }
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

  ngOnInit() {
  }

  fileChangeEvent(event) {
    // console.log("file changed");
    this.showFileUpload = false;
    this.startComponentMatch();
  }

  startComponentMatch() {
    setTimeout(()=>{    //<<<---
      // console.log("Loaded")
      alert("You've discovered a locked feature!");
      alert("You'll unlock a sample component recognition model if we get into Finals.");
      this.showFileUpload = true;
      this.componentFound = "turbofan";
      this.navigateToTwinview(this.componentFound);
    }, 1000);
  }

  navigateToTwinview(componentFound) {
    setTimeout(()=>{    //<<<---

      this.router.navigateByUrl('/twin/' + componentFound);

    }, 1000);
  }


}
