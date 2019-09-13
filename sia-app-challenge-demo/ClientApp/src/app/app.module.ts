import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { TreeModule } from 'angular-tree-component'
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ParticlesModule } from 'angular-particle';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

PlotlyModule.plotlyjs = PlotlyJS;


// Routes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { PinboardComponent } from './pinboard/pinboard.component';

//Digital Twin Routes
import { TwinhomeComponent } from './twin/twinhome/twinhome.component';
import { TurbofanComponent } from './twin/turbofan/turbofan.component';

// import { LandinggearComponent } from './twin/landinggear/landinggear.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,

    //Digital Twin
    TwinhomeComponent,
    TurbofanComponent,

    PinboardComponent,
    // LandinggearComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    TreeModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSRBKsUKnowfWHvF14JdCDexOVrLFghuE'
    }),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule,
    DragDropModule,
    ParticlesModule,
    PlotlyModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
