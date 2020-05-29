import { Component, OnInit } from '@angular/core';
import { HighchartsChartModule} from 'highcharts-angular'
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import { take, first,switchMap   } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs'
import { AngularFireStorage } from "@angular/fire/storage";
import { ListResult } from '@angular/fire/storage/interfaces';



@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss'],
})
export class HomeUserComponent implements OnInit {

  $coordinates: Observable<any[]>;
  $NDVI1: Observable<ListResult>;
  $NDVI2: Observable<string|null>;
  $NDVI3: Observable<string|null>;
  $NDVI4: Observable<string|null>;
  $NDVI5: Observable<string|null>;
  $DIST1: Observable<string|null>;
  $DIST2: Observable<string|null>;
  $DIST3: Observable<string|null>;


  $profileUrl: Observable<string|null>;

  constructor(private router: Router,private afAuth: AngularFireAuth, private db: AngularFireDatabase, private storage: AngularFireStorage) {

    this.$coordinates =  this.afAuth.user.pipe(
      take(1),
      switchMap(user =>
      this.db.list(`coordinatesUser/${user.uid}`).valueChanges()));
  }



  ngOnInit(){
    this.callImages();
  }


  callImages()
  {
   this.$NDVI1 = this.afAuth.user.pipe(
      take(1),
      switchMap(user =>
      this.storage.ref(`${user.uid}/-M7uZAnWGixBEXLDwDhr/NDVI1.png`).getDownloadURL()));

      this.$NDVI2 = this.afAuth.user.pipe(
        take(1),
        switchMap(user =>
        this.storage.ref(`${user.uid}/-M7uZAnWGixBEXLDwDhr/NDVI2.png`).getDownloadURL()));

        this.$NDVI3 = this.afAuth.user.pipe(
          take(1),
          switchMap(user =>
          this.storage.ref(`${user.uid}/-M7uZAnWGixBEXLDwDhr/NDVI3.png`).getDownloadURL()));

          this.$NDVI4 = this.afAuth.user.pipe(
            take(1),
            switchMap(user =>
            this.storage.ref(`${user.uid}/-M7uZAnWGixBEXLDwDhr/NDVI4.png`).getDownloadURL()));

            this.$NDVI5 = this.afAuth.user.pipe(
              take(1),
              switchMap(user =>
              this.storage.ref(`${user.uid}/-M7uZAnWGixBEXLDwDhr/NDVI5.png`).getDownloadURL()));

              this.$DIST1 = this.afAuth.user.pipe(
                take(1),
                switchMap(user =>
                this.storage.ref(`${user.uid}/-M7uZAnWGixBEXLDwDhr/DIST1.png`).getDownloadURL()));
                this.$DIST2 = this.afAuth.user.pipe(
                  take(1),
                  switchMap(user =>
                  this.storage.ref(`${user.uid}/-M7uZAnWGixBEXLDwDhr/DIST2.png`).getDownloadURL()));
                  this.$DIST3 = this.afAuth.user.pipe(
                    take(1),
                    switchMap(user =>
                    this.storage.ref(`${user.uid}/-M7uZAnWGixBEXLDwDhr/DIST3.png`).getDownloadURL()));


  }


  btnClickMapUser = function () {
    this.router.navigate(['mapUser']);
};

btnDashBoard = function () {
  this.router.navigate(['homeUser']);
};

}

