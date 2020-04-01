import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboradComponent } from './dashborad.component';
import { dashboradRoutes } from './dashbord.routes';
// import { CommonModule } from '@angular/common';

const rutasHijas: Routes = [
  {path: '', component: DashboradComponent,
  children: dashboradRoutes,
  // canActivate: [AuthGuard]
},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( rutasHijas)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
