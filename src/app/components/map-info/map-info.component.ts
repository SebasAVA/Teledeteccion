import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap,take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-map-info',
  templateUrl: './map-info.component.html',
  styleUrls: ['./map-info.component.scss']
})
export class MapInfoComponent implements OnInit {
  $ImagesRoute: Observable<any[]>;
  subscribe: Subscription;
  id: string;
  animal: string;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase,private afAuth: AngularFireAuth,private router: Router) {

    console.log(this.id);


    this.$ImagesRoute =  this.afAuth.user.pipe(
      take(1),
      switchMap(user =>
      this.db.list( `Images/${user.uid}/${this.id}`).valueChanges()));




  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id);

  }

  btnClickMapUser = function () {
    this.router.navigate(['mapUser']);
};

btnDashBoard = function () {
  this.router.navigate(['homeUser']);
};



}
