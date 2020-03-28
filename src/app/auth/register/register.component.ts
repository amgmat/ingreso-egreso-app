import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private store: Store<AppState>,
               private router: Router) { }
 

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });

    this.uiSubscription = this.store.select('ui').subscribe(ui =>
      this.cargando = ui.isLoading);
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    if( this.registroForm.invalid) {return;}

    this.store.dispatch(ui.isLoading());
    // console.log(this.registroForm);
    // console.log(this.registroForm.valid);
    // console.log(this.registroForm.value);
    // Swal.fire({
    //   title: 'Espere un momento por favor',
    //   // html: 'I will close in <b></b> milliseconds.',
    //   // timer: 2000,
    //   // timerProgressBar: true,
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
        
    //   }
    // });

    const {nombre, correo, password} = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password)
    .then( credenciales => {
      console.log(credenciales);
      // Swal.close();
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['/']);
    })
    .catch( err => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No pudo crearse el usuario',
        // footer: '<a href>Why do I have this issue?</a>'
      })
    });

    
  }

}
