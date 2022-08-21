import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss'],
})
export class EmailSentComponent implements OnInit {

  email=[]
  id = "";
  fontSize = 20;
  listEmail(){
    this.es.sent(this.id).subscribe(
      (data) => {this.email = data;}
    );
  }

  constructor(private storage:Storage, public es:EmailService) { }

  
  async ngOnInit() {
    this.id = await this.storage.get('user_id');
    this.listEmail();
  }

}
