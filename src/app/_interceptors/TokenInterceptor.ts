import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";
 
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        if (request.url.includes('/api/produtos')) {
 
            var accessToken = localStorage.getItem('ACCESS_TOKEN');
 
            request = request.clone({
                setHeaders: { Authorization: 'Bearer ' + accessToken }
            });
        }
 
        return next.handle(request);
    }
}
