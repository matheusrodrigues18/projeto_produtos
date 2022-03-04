import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  mensagemSucesso : String = '';
  mensagemErro: String = '';

  constructor(private httpClient: HttpClient) { }

  formAccount = new FormGroup({

    nome: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    login: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    senha: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(20)])

  });

  get form():any{
    return this.formAccount.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(): void{

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.httpClient.post(environment.apiUrl+"/account",this.formAccount.value,{responseType: 'text'}).subscribe((data)=>{

      this.mensagemSucesso = data;
      this.formAccount.reset();

    },(e)=>{

      this.mensagemErro = e.error;
      console.log(e.error);

    });

  }

}
