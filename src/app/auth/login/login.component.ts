import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }
  

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });
  }

  loginUsuario(){
    if(this.loginForm.invalid){return;}


    Swal.fire({
      title: 'Espere un momento por favor',
      // html: 'I will close in <b></b> milliseconds.',
      // timer: 2000,
      // timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
        
      }
    });

    const {email, password} = this.loginForm.value;
    this.authService.loginUsuario(email, password)
    .then( credenciales => {
      console.log(credenciales);
      Swal.close();
      this.router.navigate(['/']);
    })
    .catch( err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'no puede iniciarse sesión, revisa tus datos'
        // text: err.message
        // footer: '<a href>Why do I have this issue?</a>'
      });
    });
  }

}
