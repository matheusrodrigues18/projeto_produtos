import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_interceptors/TokenInterceptor';
 
import { AppComponent } from './app.component';
import { CadastrarProdutosComponent } from './cadastrar-produtos/cadastrar-produtos.component';
import { ConsultarProdutosComponent } from './consultar-produtos/consultar-produtos.component';
import { EditarProdutosComponent } from './editar-produtos/editar-produtos.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: 'cadastrar-produtos', component: CadastrarProdutosComponent },
  { path: 'consultar-produtos', component: ConsultarProdutosComponent },
  { path: 'editar-produtos/:id', component: EditarProdutosComponent },  
  { path: 'account', component: AccountComponent },
  { path: '', component: LoginComponent } 
]
 
@NgModule({
  declarations: [
    AppComponent,
    CadastrarProdutosComponent,
    ConsultarProdutosComponent,
    EditarProdutosComponent,
    LoginComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 


