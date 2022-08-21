import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.scss'],
})
export class EmailDetailComponent implements OnInit {

  id:string = "";
  userId:string = "";
  recipient:string = "";
  receiver:string = "";
  message:string = "";
  subject:string = "";
  image:string = "";

  userFav = "";
  item = [];
  send:string ="";
  constructor(public route:ActivatedRoute, public es: EmailService, private storage:Storage, public ac: AppComponent) { }

  emailDetail(){
    this.es.detail(this.id).subscribe(
      (data) => {this.id = data[0]['id'],this.recipient = data[0]['recipient'],this.receiver = data[0]['receiver'], this.subject = data[0]['subject'], this.message = data[0]['message'], this.image = data[0]['file'], 
      this.item[0]=data[0]['recipient'], this.item[1] = data[0]['subject'], this.send = JSON.stringify(this.item)}
    );
  }

  addFavorite(){
    this.userFav = "1";
    this.es.addFavorite(this.userId, this.id).subscribe(
      (data) => {}
    );
  }

  removeFavorite(){
    this.userFav = "";
    this.es.removeFavorite(this.id).subscribe(
      (data) => {}
    );
  }

  checkFavorite(){
    this.es.checkFavorite(this.id).subscribe(
      (data) => {if(data['result']=="success"){this.userFav = "1"}else{this.userFav=""}}
    );
  }

  deleteMail(){
    this.es.deleteMail(this.id).subscribe(
    );
    alert("Email Deleted");
  }

  async ngOnInit() {
    this.userId = await this.storage.get('user_id');
    this.id = this.route.snapshot.params['id'];
    this.checkFavorite();
    this.emailDetail();
  }
}
