import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  currentUrl : string = ''

  constructor(private router : Router){}

  ngOnInit(){
    this.currentUrl = this.router.url;
  }

  openMainMenu(){
    console.log(document.getElementById('navbar-default')?.classList)
    if(document.getElementById('navbar-default')?.classList.contains('hidden')){
      document.getElementById('navbar-default')?.classList.remove('hidden');
    }
    else{
        document.getElementById('navbar-default')?.classList.add('hidden');
    }
  }

}
