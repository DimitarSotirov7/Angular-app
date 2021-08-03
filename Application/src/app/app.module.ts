import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { UserService } from './services/user.service';
import { UserModule } from './user/user.module';
import { StorageService } from './services/storage.service';
import { environment } from 'src/environments/environment.prod';
import { FirebaseService } from './services/firebase.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BlogService } from './services/blog.service';
import { BlogModule } from './blog/blog.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    UserModule,
    BlogModule,
    NoopAnimationsModule
  ],
  providers: [
    UserService,
    StorageService,
    FirebaseService,
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
