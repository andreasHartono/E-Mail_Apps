import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  login (email:string, password:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('email',email);
    body = body.set('password',password);
    return this.http.post("https://ubaya.fun/hybrid/160419095/login.php", body);
  }

  insertUser(firstName: string, lastName:string, email:string, password:string){
    let body = new HttpParams();
    body = body.set('first',firstName);
    body = body.set('last',lastName);
    body = body.set('email',email);
    body = body.set('password',password);
    return this.http.post("https://ubaya.fun/hybrid/160419095/register.php", body);
  }
}
