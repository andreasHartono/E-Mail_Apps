import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EmailService } from '../email.service';
import { Storage } from '@ionic/storage';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-write-email',
  templateUrl: './write-email.component.html',
  styleUrls: ['./write-email.component.scss'],
})
export class WriteEmailComponent implements OnInit {

  toEmail:string = "";
  subject:string = "";
  content:string = "";
  urlImage:string = "https://ubaya.fun/hybrid/160419095/img/noImage.jpg";
  id:string = "";
  
  
  
  email=[]

  constructor(public route:ActivatedRoute, private storage:Storage, public es:EmailService, public camera:Camera, public ac: AppComponent) { }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum: true
  };

  captureImage() {
    this.camera.getPicture(this.options).then(
      (imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.urlImage = base64Image;
      }
    )
  }

  async ngOnInit() {
    this.id = await this.storage.get('user_id');
    this.email = JSON.parse(this.route.snapshot.params['item']);
    if(this.email[0]!=""){
      this.toEmail = this.email[0];
      this.subject = 'Reply: '+this.email[1];
    }
  }

  sendEmail() {
    // const formFile = new FormData();
    // formFile.append('image',this.file);
    // this.http.post("",formFile).subscribe((response:any) => {
    //   console.log(response);
    // });

    this.es.writeEmail(this.id, this.toEmail, this.subject, this.content, this.urlImage)
    .subscribe(
      (data) => {
        alert(data["message"]);
        this.ac.homeClick();
      }
    );
  }
}
