import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  display (id:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('id',id);
    return this.http.post("https://ubaya.fun/hybrid/160419095/displayMail.php", body);
  }

  detail (id:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('id',id);
    return this.http.post("https://ubaya.fun/hybrid/160419095/mailDetail.php", body);
  }

  sent (id:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('id',id);
    return this.http.post("https://ubaya.fun/hybrid/160419095/mailSent.php", body);
  }

  writeEmail(id:string,email:string,subject:string,content:string,image:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('id',id);
    body = body.set('email',email);
    body = body.set('subject',subject);
    body = body.set('content',content);
    body = body.set('image',image);
    return this.http.post("https://ubaya.fun/hybrid/160419095/mailsend.php",body);
  }

  addFavorite (userId:string, messageId:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('userId',userId);
    body = body.set('messageId',messageId);
    return this.http.post("https://ubaya.fun/hybrid/160419095/favorite.php", body);
  }

  removeFavorite (messageId:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('messageId',messageId);
    return this.http.post("https://ubaya.fun/hybrid/160419095/removeFavorite.php", body);
  }

  checkFavorite (messageId:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('messageId',messageId);
    return this.http.post("https://ubaya.fun/hybrid/160419095/checkFavorite.php", body);
  }

  displayFavorite (messageId:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('id',messageId);
    return this.http.post("https://ubaya.fun/hybrid/160419095/displayFavorite.php", body);
  }

  deleteMail (messageId:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('id',messageId);
    return this.http.post("https://ubaya.fun/hybrid/160419095/deleteMail.php", body);
  }

  displayProfile (Id:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('id',Id);
    return this.http.post("https://ubaya.fun/hybrid/160419095/displayProfile.php", body);
  }

  updateProfile (Id:string, firstName: string, lastName:string) :Observable<any>{
    let body = new HttpParams();
    body = body.set('id',Id);
    body = body.set('first',firstName);
    body = body.set('last',lastName);
    return this.http.post("https://ubaya.fun/hybrid/160419095/updateProfile.php", body);
  }
}
