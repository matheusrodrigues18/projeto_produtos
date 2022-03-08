import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthHelper } from '../_helpers/auth-helper';
 
@Component({
  selector: 'app-consultar-produtos',
  templateUrl: './consultar-produtos.component.html',
  styleUrls: ['./consultar-produtos.component.css']
})
export class ConsultarProdutosComponent implements OnInit {
 
  produtos: any[] = [];
  exibirPagina: boolean = false;
 
  constructor(
    private httpClient: HttpClient,
    private authHelper: AuthHelper
  ) { }
 
  ngOnInit(): void {
 
    if (this.authHelper.isAuthenticated()) {
      this.exibirPagina = true;
    }
    else {
      window.location.href = '/';
    }
 
    this.httpClient.get(environment.apiUrl + '/produtos')
      .subscribe(
        (data) => {
          this.produtos = data as any[];
        },
        (e) => {
          console.log(e);
        }
      )
  }
 
  excluir(idProduto: number): void {
 
    if (window.confirm('Deseja realmente excluir o produto selecionado?')) {
 
      this.httpClient.delete(environment.apiUrl + "/produtos/" + idProduto,
        { responseType: 'text' })
        .subscribe(
          (data) => {
            alert(data);
            this.ngOnInit();
          },
          (e) => {
            console.log(e);
          }
        )
    }
  }
}