import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  id:string = "";
  firstName:string = "";
  lastName:string = "";
  email:string = "";
  displayProfile(){
    this.es.displayProfile(this.id).subscribe(
      (data)=>{this.firstName=data["first"], this.lastName=data["last"], this.email=data["email"]}
    );
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  constructor(private storage:Storage, public es: EmailService) { }

  async ngOnInit() {
    this.id = await this.storage.get('user_id');
    this.displayProfile();
  }

}
