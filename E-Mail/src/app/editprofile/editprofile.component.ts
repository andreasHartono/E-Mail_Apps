import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
})
export class EditprofileComponent implements OnInit {

  id = "";
  firstName:string = "";
  lastName:string = "";
  displayProfile(){
    this.es.displayProfile(this.id).subscribe(
      (data)=>{this.firstName=data["first"], this.lastName=data["last"]}
    );
  }
  editProfile(){
    this.es.updateProfile(this.id, this.firstName, this.lastName).subscribe(
      (data)=>{alert(data["message"])}
    );
  }

  constructor(private storage:Storage, public es: EmailService) { }

  async ngOnInit() {
    this.id = await this.storage.get('user_id');
    this.displayProfile();
  }

}
