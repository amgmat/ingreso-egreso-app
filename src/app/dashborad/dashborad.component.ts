import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as IngresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';


@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresosSubs: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {

    this.userSubs = this.store.select('user')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe(({user}) => {
      console.log(user);
      this.ingresosSubs = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
      .subscribe(ingresosEgresosFB => {
      // console.log(ingresosEgresosFB);
      this.store.dispatch(IngresoEgresoActions.setItems({items: ingresosEgresosFB}));
    });
    }
    );
  }

  ngOnDestroy(){
    this.ingresosSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }

}
