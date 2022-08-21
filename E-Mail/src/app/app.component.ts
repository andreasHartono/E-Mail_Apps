import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppService } from './app.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user_id = "";
  login_user="";
  login_password = "";
  login_error="";
  result = "";

  registerUser = "";
  first = "";
  last = "";
  user_email = "";
  user_pass = "";
  regis_result = "";
  regis_error = "";

  item = 1;

  defaultClick() {
    this.item = 0;
  }

  homeClick() {
    this.item = 1;
  }

  constructor(private storage:Storage,public as:AppService, public navCtrl: NavController) {}

  login(){
    this.as.login(this.login_user, this.login_password).subscribe(
      (data)=>{this.result = data['result']; if(this.result == "success"){this.user_id = data['data']['id'];this.storage.set('user_id', this.user_id);}else{
        this.login_error = "username/password salah";
      }}
    );
  }

  back(){
    this.registerUser = "";
  }

  register(){
    this.registerUser = "1";
  }

  insert(){
    this.as.insertUser(this.first, this.last, this.user_email, this.user_pass).subscribe(
      (data)=>{this.regis_result = data['result'];if(this.regis_result == "success"){this.registerUser="";}else{
        this.login_error = "Register Gagal";
      }}
    );
  }

  logout(){
    this.storage.remove('user_id');
    window.location.href="/"
  }
 
  async ngOnInit(){
    await this.storage.create();
    this.user_id = await this.storage.get('user_id');
  }
}
