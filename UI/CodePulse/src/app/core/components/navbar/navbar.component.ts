import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Features/auth/services/auth.service';
import { User } from '../../../Features/auth/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {


  user?: User;
constructor(private authservice: AuthService, private router : Router){}




  ngOnInit(): void {
    this.authservice.user().subscribe({
      next: (Response) => {
        this.user = Response;
      }
    });
    this.user = this.authservice.getUser();
  }

  onLogout():void {
    this.authservice.logout();
    this.router.navigateByUrl('/');
    }

}
