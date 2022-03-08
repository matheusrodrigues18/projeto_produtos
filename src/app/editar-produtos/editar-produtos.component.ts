import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AuthHelper } from '../_helpers/auth-helper';
 
@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent implements OnInit {
 
  mensagem: string = '';
  exibirPagina: boolean = false;
 
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private authHelper: AuthHelper
  ) { }
 
  ngOnInit(): void {
 
    if (this.authHelper.isAuthenticated()) {
      this.exibirPagina = true;
    }
    else {
      window.location.href = '/';
    }
 
    const idProduto = this.activatedRoute.snapshot.paramMap.get('id') as string;
 
    this.httpClient.get(environment.apiUrl + "/produtos/" + idProduto)
      .subscribe(
        (data: any) => {
          this.formEdicao.patchValue(data);
        },
        (e) => {
          console.log(e);
        }
      )
  }
 
  formEdicao = new FormGroup({
    idProduto: new FormControl(''),
    nome: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formEdicao.controls;
  }

  onSubmit(): void {
 
    this.httpClient.put(
      environment.apiUrl + '/produtos', this.formEdicao.value, { responseType: 'text' })
      .subscribe(
        data => {
          this.mensagem = data;
        },
        e => {
          this.mensagem = "Ocorreu um erro, a edição não foi realizada.";
          console.log(e);
        }
      )
  }
 
}
 


