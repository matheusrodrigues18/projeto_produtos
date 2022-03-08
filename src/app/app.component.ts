import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'projeto_produtos';
  isAuthenticated : boolean = false;
  userLogin: String | null = '';

  ngOnInit(): void {
    
    this.isAuthenticated = localStorage.getItem('ACCESS_TOKEN')!=null && localStorage.getItem("USER_LOGIN") != null;

    if(this.isAuthenticated){

      this.userLogin = localStorage.getItem('USER_LOGIN');

    }

  }

  logout():void{

    if(window.confirm('Deseja realmente sair do sistema?')){
        
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('USER_LOGIN');

      window.location.href = "/";

    }

  }

}
