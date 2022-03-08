import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthHelper } from '../_helpers/auth-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagemErro : String = '';
  exibirPagina : boolean = false;

  constructor(private httpClient : HttpClient, private authHelper: AuthHelper) { }

  formLogin = new FormGroup({

    login: new FormControl('',[Validators.required]),
    senha: new FormControl('',[Validators.required])

  });

  get form():any{
    return this.formLogin.controls;
  }

  ngOnInit(): void {

    if(this.authHelper.isAuthenticated()){
      window.location.href = "/consultar-produtos";
    }else{
      this.exibirPagina = true;
    }

  }

  onSubmit(): void{

    this.mensagemErro = '';

    this.httpClient.post(environment.apiUrl+"/login",this.formLogin.value,{responseType: 'text'}).subscribe((data)=>{

      localStorage.setItem('ACCESS_TOKEN',data);
      localStorage.setItem('USER_LOGIN',this.formLogin.value.login);

      this.formLogin.reset();

      window.location.href="/consultar-produtos";

    },(e)=>{

      this.mensagemErro = e.error;
      console.log(e.error);

    })

  }

}
