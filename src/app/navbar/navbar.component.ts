import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userLogged = this.authService.getUserLogged();
  disabled: boolean = false;

  constructor(private authService: ServiceService, private route: Router) {}

  ngOnInit(): void {
    this.traerdatos();
  }

  traerdatos() {
    this.userLogged.subscribe((value) => {    
      if (value?.email == undefined) {
        this.disabled = true;        
      } else {
        this.disabled = false;       
      }
    });
  }

  login() {
    this.route.navigate(['login']);
  }

  
}
