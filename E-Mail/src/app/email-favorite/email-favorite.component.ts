import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-email-favorite',
  templateUrl: './email-favorite.component.html',
  styleUrls: ['./email-favorite.component.scss'],
})
export class EmailFavoriteComponent implements OnInit {

  email=[]
  id = "";
  fontSize=20;

  listEmail(){
    this.es.displayFavorite(this.id).subscribe(
      (data) => {this.email = data;}
    );
  }

  constructor(private storage:Storage, public es:EmailService) { }

  async ngOnInit() {
    this.id = await this.storage.get('user_id');
    this.listEmail();
  }
}
