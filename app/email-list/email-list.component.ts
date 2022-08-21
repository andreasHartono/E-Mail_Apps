import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
})
export class EmailListComponent implements OnInit {
  
  email=[]
  id = "";
  fontSize = 20;
  listEmail(){
    this.es.display(this.id).subscribe(
      (data) => {this.email = data;}
    );
  }

  constructor(private storage:Storage, public es:EmailService) { }

  
  async ngOnInit() {
    this.id = await this.storage.get('user_id');
    this.listEmail();
  }

}
