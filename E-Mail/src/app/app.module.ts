import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WriteEmailComponent } from './write-email/write-email.component';
import { FormsModule } from '@angular/forms';
import { EmailListComponent } from './email-list/email-list.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { EmailFavoriteComponent } from './email-favorite/email-favorite.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

import { EmailService } from './email.service';
import { AppService } from './app.service';

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';


const appRoutes:Routes = [
  {path:'write/:item', component: WriteEmailComponent},
  {path:'list', component: EmailListComponent},
  {path:'detail/:id', component: EmailDetailComponent},
  {path:'sent', component: EmailSentComponent},
  {path:'favorite', component: EmailFavoriteComponent},
  {path:'profile', component: ProfileComponent},
  {path:'editprofile', component: EditprofileComponent}
]

@NgModule({
  declarations: [AppComponent, WriteEmailComponent, EmailListComponent, EmailDetailComponent, EmailSentComponent, EmailFavoriteComponent, ProfileComponent, EditprofileComponent],
  entryComponents: [],
  imports: [IonicStorageModule.forRoot(),HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [Camera, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, AppService, EmailService],
  bootstrap: [AppComponent],
})
export class AppModule {}
