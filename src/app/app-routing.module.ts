import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
// import { DashboradComponent } from './dashborad/dashborad.component';
// import { dashboradRoutes } from './dashborad/dashbord.routes';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then(m => m.IngresoEgresoModule)
    },
    {path: '**', redirectTo: ''}
]
// {path: '', component: DashboradComponent,
    //     children: dashboradRoutes,
    //     canActivate: [AuthGuard]
    // },

@NgModule({

    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]

})

export class AppRoutingModule {}