import { Component, OnInit } from '@angular/core';
import { HighchartsChartModule} from 'highcharts-angular'
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import { take, first,switchMap   } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs'
import { coordinateModel} from '../../core/models/coordinates.model'


@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss'],
})
export class HomeUserComponent implements OnInit {

  $coordinates: Observable<any[]>;

  constructor(private router: Router,private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.$coordinates =  this.afAuth.user.pipe(
      take(1),
      switchMap(user =>
      this.db.list(`coordinatesUser/${user.uid}`).valueChanges()));
  }




  ngOnInit(){

  }




  btnClickMapUser = function () {
    this.router.navigate(['mapUser']);
};

btnDashBoard = function () {
  this.router.navigate(['homeUser']);
};

}

