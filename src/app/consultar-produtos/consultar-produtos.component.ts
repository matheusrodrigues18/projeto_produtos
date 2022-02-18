import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultar-produtos',
  templateUrl: './consultar-produtos.component.html',
  styleUrls: ['./consultar-produtos.component.css']
})
export class ConsultarProdutosComponent implements OnInit {

  produtos: any[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

    this.httpClient.get("http://localhost:8080/api/produtos").subscribe((data) =>{

      this.produtos = data as any[];

    },(e)=>{

      console.log(e);

      }
    )
  }

}
