import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { TreeTwinService } from '../../services/tree-twin.service';
import { PinboardService } from '../../services/pinboard.service';
import { InventoryService } from '../../services/inventory.service';

import * as THREE from 'three';
import "../EnableThreeExamples";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import SpriteText from 'three-spritetext';

import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-turbofan',
  templateUrl: '../twinview/twinview.component.html',
  styleUrls: ['../twin.component.css']
})
export class TurbofanComponent implements OnInit {

  constructor(
    private _router:Router,
    private _treeTwinService:TreeTwinService,
    private _pinboardService:PinboardService,
    private _inventoryService: InventoryService,
    private ngxExtendedPdfViewerService: NgxExtendedPdfViewerService
             )
  {
    this.render = this.render.bind(this);
  }

  ngOnInit() {
    this.playing = true;
    var scope = this;
    this.componentNames.forEach(function(name) {
      scope.nodes[0].children.push(
        { name:name }
      )
    })
    // console.log(this.nodes[0].children);
   }

  ngOnDestroy() {
    cancelAnimationFrame(this.requestId);
    this.playing = false;

    console.warn("disposing interactables geometry and material...")
    this.interactables.forEach(function(group) {
      group.children.forEach(function(subgroup) {
        subgroup.children.forEach(function(mesh) {
          try {
            mesh.geometry.dispose();
            mesh.material.dispose();
            // console.log("disposed geometry and material for mesh " + mesh.name);
          } catch(e) {
            console.warn(e);
          }
        })
      })
    })

    console.warn("removing all children from scene...")
    while(this.scene.children.length > 0){
        this.scene.remove(this.scene.children[0]);
    }

    // Initialize //
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.manager = null;
    this.interactables = null;
    this.highlightGroup = null;
    this.mesh = null;
    this.raycaster = null;
    this.componentGroups = null;

  }



  @ViewChild('rendererContainer', { static: false }) rendererContainer: ElementRef;

  // Performance-related =============
  requestId = null;
  playing = null;
  // =================================

  //Scene Startup (Main) =============
  renderer = null;
  scene = null;
  camera = null;
  controls = null;
  manager = null;
  mesh = null;
  // ================================

  //Functionality ===================
  loaded = false;
  showTwin = true;
  showManual = false;
  isScanningLogbook = false;

  modalVideo = null;
  modalCreatePin = null;
  pdfViewer = null;

  pinsForComponent = null;

  pinFormFields = {
    title:'',
    description:'',
    actionsTaken:'',
    inventoryExpended: {
      a:0,
      b:0,
      c:0
    },
    severity:'green',
  }

  //==================================

  //Text Labels and Sensor Data
  currentlabel = null;

  //Component Groups ===============================================================
  componentNames =
    ['turbine_spool_1','turbine_spool_2','propeller_spool','control_box_1','control_box_2','control_box_3',
     'casing', 'combustor_ring','exhaust_valve_1','exhaust_valve_2','front_bracket_1','front_bracket_2',
     'front_fuel_pipe_1','front_fuel_pipe_2','fuel_pipe_filter','propeller','propeller_spool','rear_cone',
     'monitoring_unit_1','monitoring_unit_2','monitoring_unit_3','stators','supports']

  componentGroups = {
    rotateComponent: null,
    rotateComponentPropeller: null,
    frameComponent: null
  }

  //================================================================================

  //Raycasting ==========================
  raycaster = null;
  mousex = null;
  mousey = null;
  interactables = null;
  highlightGroup = null;
  componentSelected = "None";
  displayComponentSelected = "None";
  //=====================================

  //Tree ================================
  nodes = [{ name: 'Turbofan (Boeing 787)', children: [] }];

  actionMapping:IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {
        if (!node.children) {

          // Remove all existing highlights
          if (this.highlightGroup != null) {

            this.highlightGroup.forEach(function (child) {
              child.material.opacity = 0.1;
              child.material.emissive = new THREE.Color("rgb(0,0,0)");
            })

            this.highlightGroup = null;
          }

          // console.log(node.data.name);

          if (node.data.name.includes('⚠️')) {
            var name = node.data.name.slice(0,-2);
          } else {
            var name = node.data.name;
          }
          this.componentSelected = name;
          this.displayComponentSelected = this.componentSelected.split("_").join(" ");

          var componentNameToMatch = "__component__" + name;
          var scope = this;
          for (var key in this.componentGroups) {
            if (scope.componentGroups.hasOwnProperty(key)) {
                var components = scope.componentGroups[key];
                if (components.getObjectByName(componentNameToMatch)) {
                  var parent = components.getObjectByName(componentNameToMatch);
                  if (scope.highlightGroup == null) {
                    var opaqueList = [];
                    parent.children.forEach(function (child) {
                      child.material.opacity = 1;
                      opaqueList.push(child);
                    })
                    scope.highlightGroup = opaqueList;
                }
                break;
              }
            }

            }
          } else {
            this.camera.position.set(400, 200, 0);
            this.camera.updateProjectionMatrix();
            this.controls.update();
          }
        }
      }
    }

  options: ITreeOptions = { actionMapping: this.actionMapping};
   //===================================


  // Resize Window Event Listener =============================================================================================================================

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {

    var divWidth = document.getElementById("rendererContainer").offsetWidth;
    var divHeight = document.getElementById("rendererContainer").offsetHeight;
    this.camera.aspect = divWidth / divHeight;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(divWidth, divHeight);
    this.controls.update();
  }

  // ==========================================================================================================================================================

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  OnMouseDown(event) {


  if (this.loaded == true) {

    var rect = this.renderer.domElement.getBoundingClientRect();

	if (event.type == 'mousedown' && event.path && this.showTwin) {

	  if (event.path[1].id == "rendererContainer") {

	    event.preventDefault();
            this.mousex = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
            this.mousey = - ((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

	  }
	}
	else if (event.type == 'touchstart' && this.showTwin) {
    //console.log(event.targetTouches[0]);
	  //console.log(event.targetTouches[0].target.nodeName);
	  if (event.targetTouches[0].target.nodeName == "CANVAS") {

	    event.preventDefault();
	    this.mousex = ((event.targetTouches[0].clientX - rect.left) / (rect.right - rect.left)) * 2 - 1
      this.mousey = - ((event.targetTouches[0].clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
	  }
	}

        if ((event.path && event.path[1].id == "rendererContainer") || (event.type == 'touchstart' && event.targetTouches[0].target.nodeName == "CANVAS"))
        this.checkIntersect();

        //Other functions


        //Other functions

  }
}


  // MouseClick Event Listener ===============================================================================================================================

  @HostListener('contextmenu', ['$event'])
  StopContextMenu(event) {
    event.preventDefault();
  }

  // Raycast MouseHover =========================================================================================================================================


  checkIntersect() {
    var scope = this;
    if (this.scene != null && this.raycaster != null) {
      var mouse = new THREE.Vector2(this.mousex, this.mousey), INTERSECTED;
      this.raycaster.setFromCamera(mouse, this.camera);

      var intersects = this.raycaster.intersectObjects(this.interactables, true);
      if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
          INTERSECTED = intersects[0].object;

          if (INTERSECTED.parent.name.includes("__component__") && !INTERSECTED.parent.name.includes("__highlight_group__")) {

            // Remove all existing highlights =========================================================

            if (this.highlightGroup != null) {

              this.highlightGroup.forEach(function (child) {
                child.material.opacity = 0.1;
                child.material.emissive = new THREE.Color("rgb(0,0,0)");
              })

              this.highlightGroup = null;
            }

            //Remove all Labels ------------------

            // if (this.currentlabel) {
            //   this.scene.remove(this.currentlabel);
            //   this.currentlabel = null;
            // }

            //Remove all Labels ------------------

            // Remove all existing highlights =========================================================

            var parent = INTERSECTED.parent;

            this.componentSelected = INTERSECTED.parent.name.replace("__component__", "");
            this.displayComponentSelected = this.componentSelected.split("_").join(" ");;

            // Make Labels Appear ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



            // Make Labels Appear ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            // Construct new highlight =========================================================

            if (this.highlightGroup == null) {
              //var group = new THREE.Group;
              var opaqueList = [];

              parent.children.forEach(function (child) {

                child.material.opacity = 1;
                opaqueList.push(child);

              })

              scope.highlightGroup = opaqueList;

              // Construct new highlight =========================================================
            }
          }
        }
      } else {
        // If there are no intersects =========================================================

        INTERSECTED = null;
        this.componentSelected = 'None';
        if (this.highlightGroup != null) {

          this.highlightGroup.forEach(function (child) {

            // Reset All highlights
            child.material.opacity = 0.1;
            child.material.emissive = new THREE.Color("rgb(0,0,0)");

          })
        }

        this.highlightGroup = null;

        //Remove all Labels ------------------
        // if (this.currentlabel) {
        //   this.scene.remove(this.currentlabel);
        // }
        // this.currentlabel = null;
        //Remove all Labels ------------------

        // If there are no intersects =========================================================
      }
    }
  }

  // Raycast MouseHover =========================================================================================================================================



  private initGL(): void {

    // Basic Init
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x282828);
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / (window.innerHeight*1.04) , 0.1, 2000);
    this.camera.updateProjectionMatrix();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setPixelRatio(window.devicePixelRatio * 0.6);

    this.renderer.setSize(window.innerWidth, (window.innerHeight*1.04));
    document.body.appendChild(this.renderer.domElement);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.raycaster = new THREE.Raycaster();



    // Mouse Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.set(400, 200, 0);
    this.camera.updateProjectionMatrix();
    this.controls.update();
    this.controls.addEventListener('mousedown', this.render);


    // Spawn Lighting
    var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);
    keyLight.name = "keyLight";
    var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);
    fillLight.name = "fillLight";
    var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();
    backLight.name = "backLight";
    this.scene.add(keyLight);
    this.scene.add(fillLight);
    this.scene.add(backLight);

    // AxesHelper
    // var axesHelper = new THREE.AxesHelper( 1000 );
    // this.scene.add( axesHelper );


    ////**********************************************************//
    //// ** THIS IS THE TRUE LOADED COMPLETE. ALWAYS USE ONLOAD **//
    //// Init Loader *********************************************//

    var scope = this;
    this.manager = new THREE.LoadingManager();
    this.manager.onStart = function (url: string, itemsLoaded: number, itemsTotal: number) {

      console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

    };

    this.manager.onProgress = function (url: string, itemsLoaded: number, itemsTotal: number) {

      console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

    };

    this.manager.onLoad = function () {

      console.log('Loading complete!');
      scope.interactables = [];
      scope.scene.children.forEach(function (child) {

          if (!child.name.includes("Light")) {
            scope.interactables.push(child);
          }

      });

      scope.loaded = true;

      // NECESSARY GAP IN TIME  `````````````````````````````````
      setTimeout(function () {

        var divWidth = document.getElementById("rendererContainer").offsetWidth;
        var divHeight = document.getElementById("rendererContainer").offsetHeight;
        scope.camera.aspect = (divWidth) / (divHeight * 0.85);
        scope.camera.updateProjectionMatrix();
        scope.renderer.setSize(divWidth, divHeight * 0.85);
        scope.controls.update();

        //Link Features
        scope.modalVideo = document.getElementById("modalVideo");
        scope.modalCreatePin = document.getElementById("modalCreatePin");
        scope.pdfViewer = document.getElementById("pdf-viewer");

      }, 0.1);
      // NECESSARY GAP IN TIME  `````````````````````````````````

    };
  }


// Feature List ==========================================================================================

      // Toggles Manual
      private toggleManual(event) {

        this.showTwin = !this.showTwin;
        this.showManual = !this.showManual;

        var searchText = this.displayComponentSelected;
        this.ngxExtendedPdfViewerService.find(searchText);

       }



      // Gets pins for a particular component
      private retrievePinsForComponent(event) {
        if (this.componentSelected) {
          this._pinboardService.GetAllPins();
          var allPins = this._pinboardService.pins;
          this.pinsForComponent = [];

          var scope = this;
          allPins.forEach(function(pin) {
            if ( pin.part == 'turbofan' && pin.component == scope.componentSelected )
              scope.pinsForComponent.push(pin);
          });
        }

      }


      //Get inventory for a particular component
      private retrieveInventoryForComponent(event) {
        if (this.componentSelected) {
            this._inventoryService.partSelectedName = 'turbofan';
            var componentName = this.componentSelected;
            this._inventoryService.getInventoryForComponent(componentName);
          }
        }


      //On upload pin Image
      private fileChangeEvent(event) {
        this.isScanningLogbook = true;
        // this.sendFileAnalyze();
        setTimeout(()=>{    //<<<---
          this.isScanningLogbook = false;
          alert("You've discovered a locked feature!");
          alert("You'll unlock an image recognition model for scanning logbooks and handwriting if we get into Finals.")
        }, 2000);
      }
      //
      // //Send scanned Logbook for analysis
      // sendFileAnalyze() {
      //   this.pinFormFields = {
      //     title:'This is scanned data.',
      //     description:'This is scanned data.',
      //     actionsTaken:'This is scanned data.',
      //     inventoryExpended: {
      //       a:3,
      //       b:6,
      //       c:9
      //     },
      //     severity:'red',
      //   }
      // }
      //
      // resetPinFormFields() {
      //   this.pinFormFields = {
      //     title:'',
      //     description:'',
      //     actionsTaken:'',
      //     inventoryExpended: {
      //       a:0,
      //       b:0,
      //       c:0
      //     },
      //     severity:'green',
      //   }
      // }


// Feature List ==========================================================================================



  // Load Obj and Mtl Function ================================================================================================================================

  private loadObject(path: string, name: string, manager, scene): void {

    var mtlLoader = new MTLLoader(manager);

    mtlLoader.load(path + name + '.mtl', (materials) => {
      materials.preload();

      var objLoader = new OBJLoader(manager);

      objLoader.setMaterials(materials);
      objLoader.load(path + name + '.obj', (object) => {


        object.name = "__component__" + name ;
        object.scale.set(50000,50000,50000);

        object.updateMatrix();
        var redOrGreen = Math.random() >= 0.5;
        if (redOrGreen == true) {
          this.nodes[0].children.forEach(function(node) {
            if (node.name == name) {
              node.name = node.name + '⚠️';
            }
          })
        }

        object.children.forEach((mesh) => {

          if (mesh instanceof THREE.Mesh && mesh.geometry instanceof THREE.BufferGeometry && mesh.material instanceof THREE.Material) {

            mesh.material.transparent = true;
            mesh.material.opacity = 0.1;
            mesh.material.flatShading = false;

            if (mesh.material instanceof THREE.MeshPhongMaterial) {

                if (redOrGreen == true) mesh.material.color = new THREE.Color('red');
                else mesh.material.color = new THREE.Color('lime');
            }
            mesh.geometry.computeVertexNormals();
          }})

      if      (name.includes('spool')) this.componentGroups.rotateComponent.add(object);
      else if (name.includes('propeller')) this.componentGroups.rotateComponentPropeller.add(object);
      else    this.componentGroups.frameComponent.add(object);

      });
    });
  }

  //===========================================================================================================================================================


  // INITCONTENT ==============================================================================================================================================

  private initContent(): void {

    this.componentGroups.rotateComponent = new THREE.Group();
    this.componentGroups.rotateComponentPropeller = new THREE.Group();
    this.componentGroups.frameComponent = new THREE.Group();
    this.scene.add(this.componentGroups.rotateComponent);
    this.scene.add(this.componentGroups.rotateComponentPropeller);
    this.scene.add(this.componentGroups.frameComponent);

    // Load Obj, Mtl from name (Main Folder)
    this.componentNames.forEach((name) => {
      var path = 'assets/models/plane/ENGINE_FINAL/';
      // var path = 'assets/models/plane/landinggear/';
      this.loadObject(path, name, this.manager, this.scene);
    })


  }


  // ==========================================================================================================================================================


  public render() {
    var fps = 60;
    var scope = this;
    setTimeout(function() {

          if (scope.playing == true) {
          scope.componentGroups.rotateComponent.rotation.x -= 0.1;
          scope.componentGroups.rotateComponentPropeller.rotation.x -= 0.025;
          this.requestId = requestAnimationFrame( scope.render );
          scope.renderer.render(scope.scene, scope.camera);
        }


    }, 1000 / fps);
  }


  ngAfterViewInit() {

    this.initGL();
    this.initContent();
    this.render();

  }

}
