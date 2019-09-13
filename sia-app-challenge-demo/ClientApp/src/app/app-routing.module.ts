import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { PinboardComponent } from './pinboard/pinboard.component';

// Digital Twin
import { TwinhomeComponent } from './twin/twinhome/twinhome.component';
import { TurbofanComponent } from './twin/turbofan/turbofan.component';
// import { LandinggearComponent } from './twin/landinggear/landinggear.component';

const appRoutes: Routes =
  [
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: OverviewComponent },
    { path: 'pinboard', component: PinboardComponent },

    // Digital Twin
    { path: 'twin', component: TwinhomeComponent},
    { path: 'twin/turbofan', component: TurbofanComponent },
    // { path: 'twin/landinggear', component: LandinggearComponent },
  ]


@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
