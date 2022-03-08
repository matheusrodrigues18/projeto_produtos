import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthHelper{

    isAuthenticated():boolean{

        return  localStorage.getItem('USER_LOGIN') != null && localStorage.getItem('ACCESS_TOKEN') != null;

    }

}