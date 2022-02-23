import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent implements OnInit {

  mensagem : string = '';

  produto : any;

  constructor(private httpClient:HttpClient, private activatedRoute : ActivatedRoute) { }

  formEdicao = new FormGroup({

    idProduto : new FormControl(''),
    nome: new FormControl('',[Validators.required]),
    preco: new FormControl('',[Validators.required]),
    quantidade: new FormControl('',[Validators.required]),
    descricao: new FormControl('',[Validators.required]),

  });

  get form() : any{

    return this.formEdicao.controls;

  }

  ngOnInit(): void {

    const idProduto = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.httpClient.get(environment.apiUrl+"/produtos/"+idProduto).subscribe((data:any)=>{

      this.formEdicao.patchValue(data);

    },(e)=>{

      console.log(e);

    });

  }

  onSubmit():void{

    this.httpClient.put(environment.apiUrl+"/produtos",this.formEdicao.value, {responseType : 'text'}).subscribe((data)=>{

      this.mensagem = data;

    },(e)=>{

      this.mensagem = "Ocorreu um erro, a edição não foi realizada.";
      console.log(e);

    });

  }

}
