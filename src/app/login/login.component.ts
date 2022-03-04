import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagemSucesso : String = '';
  mensagemErro : String = '';

  constructor(private httpClient : HttpClient) { }

  formLogin = new FormGroup({

    login: new FormControl('',[Validators.required]),
    senha: new FormControl('',[Validators.required])

  });

  get form():any{
    return this.formLogin.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(): void{

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.httpClient.post(environment.apiUrl+"/login",this.formLogin.value,{responseType: 'text'}).subscribe((data)=>{

      this.mensagemSucesso = 'Autenticação realizada com sucesso';
      this.formLogin.reset();

      localStorage.setItem('ACCESS_TOKEN',data);

    },(e)=>{

      this.mensagemErro = e.error;
      console.log(e.error);

    })

  }

}
