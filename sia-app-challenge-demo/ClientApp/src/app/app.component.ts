import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router:Router) {}

  _opened = true;
      myStyle: object = {};
      myParams: object = {};
      width: number = 100;
      height: number = 100;

      ngOnInit() {
           //alert('Hey there!\nWelcome to the SmartArk SIA Demo Application.')
           //alert('Please note that this is just a demo and all data is mocked.\nSome features are incomplete and have no underlying functionality as we are still developing the backend.')
           //alert('Creation, Updating, and Deleting also does not work as of now -\nWe will start working on a proper MVP if we get into semi-finals!')
           //alert('Please contact us if there are any functions that require further clarification.\nAlso, feel free to try this demo out on an iPad.\nThanks for your time and have a nice day ahead :) \n\n- Team SmartArk')
          this.myStyle = {
              'position': 'fixed',
              'width': '100%',
              'height': '100%',
              'z-index': -1,
              'top': 0,
              'left': 0,
              'right': 0,
              'bottom': 0,
          };

      this.myParams = {
              particles: {
                  number: {
                      value: 30,
                  },
                  color: {
                      value: '#cbcbcb'
                  },
                  shape: {
                      type: 'circle',
                  },
                  opacity: {
                    value:0.5
                  }
              },
            interactivity: {
              events: {
                onclick: {
                  enable: false
                }
              }
            }
          }

      };
}
