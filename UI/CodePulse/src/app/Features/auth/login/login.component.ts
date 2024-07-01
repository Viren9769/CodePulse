  import { Component } from '@angular/core';
  import { LoginRequest } from '../models/login-request.model';
  import { FormsModule } from '@angular/forms';
  import { AuthService } from '../services/auth.service';
  import { CookieService } from 'ngx-cookie-service';
  import {  Router } from '@angular/router';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
  })
  export class LoginComponent {


  model: LoginRequest;

  constructor(private authservice: AuthService, private cookieservice : CookieService, private router : Router){
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void {
  this.authservice.login(this.model).subscribe({
    next: (Response) =>{
      // set auth cookie
  this.cookieservice.set('Authorization', `Bearer ${Response.token}`,
    undefined, '/', undefined, true, 'Strict');

    // Set the user 
  this.authservice.setUser({
    email: Response.email,
    roles: Array.isArray(Response.roles) ? Response.roles : [Response.roles]
  });
    // Redirect to home page 
  this.router.navigateByUrl('/');
    }
  });
    }

  }
