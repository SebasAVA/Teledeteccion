import { Component, OnInit, TemplateRef,ViewChild } from '@angular/core';
import { environment } from  '../../../environments/environment'
import * as Mapboxgl from  'mapbox-gl'
import * as MapboxDraw from '@mapbox/mapbox-gl-draw'
import * as turf from '@turf/turf'
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth'
import { take } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-map-user',
  templateUrl: './map-user.component.html',
  styleUrls: ['./map-user.component.scss']
})
export class MapUserComponent implements OnInit {
  saveForm: FormGroup;
  mapa: Mapboxgl.Map;
  coordinates = [];
  Area = '';
  @ViewChild('secondDialog') secondDialog: TemplateRef<any>;
  constructor(formbuilder: FormBuilder,private router: Router,private db: AngularFireDatabase, private afAuth: AngularFireAuth, private dialog: MatDialog) {
    this.saveForm = formbuilder.group({
      name: ['', Validators.required],
      years: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    Mapboxgl.accessToken = environment.mapbox;


    this.mapa = new Mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
    center: [-74.03, 4.88], // starting position
    zoom: 12 // starting zoom
    });

    //this.crearMarcador(-74.5, 40);
    this.crearPoligono();
  }

  btnClickMapUser = function () {
    this.router.navigate(['mapUser']);
};

btnDashBoard = function () {
  this.router.navigate(['homeUser']);
};


  crearMarcador(lng: number, lat: number){
    const marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
  }

  crearPoligono()
  {
      var draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
      polygon: true,
      trash: true
      }
      });
      this.mapa.addControl(draw);

      this.mapa.on('draw.create', updateArea);
      this.mapa.on('draw.delete', updateArea);
      this.mapa.on('draw.update', updateArea);



      function updateArea(e) {


      var data = draw.getAll();
      var answer = document.getElementById('calculated-area');
      if (data.features.length > 0) {
      this.coordinates = draw.getAll().features[0].geometry.coordinates[0];

      console.log(this.coordinates);
      var area = turf.area(data);
      // restrict to area to 2 decimal points
      var rounded_area = Math.round(area * 100) / 100;
      this.Area = rounded_area;
      var a =  '<p>'+rounded_area+'</p>'
      document.getElementById("Area").innerHTML = a;


      e = '<table class="table no-wrap p-table"><thead class="bg-light"><tr class="border-0"><th class="border-0">Latitude</th> <th class="border-0">Longitude</th></tr></thead> <tbody>'
    for (var y=0; y<this.coordinates.length; y++)
        {
          e += '<tr><td>'+ Math.round(this.coordinates[y][1] * 100.0) / 100.0+'</td><td>'+Math.round(this.coordinates[y][0] * 100.0) / 100.0+'</td> </tr>';
        }
        e += '</tbody></table>';
        document.getElementById("calculated-area").innerHTML = e;
     }
      else {
      answer.innerHTML = '';
      if (e.type !== 'draw.delete')
      alert('Use the draw tools to draw a polygon!');
      }
      }

}


save(){

  console.log(this.mapa.coordinates);


  let dateTime = new Date().toString();
  let timestamp =  Date.now().toString();
  console.log(dateTime);

  const { name,years } = this.saveForm.value;
  const Coordenadas = this.mapa.coordinates;
  const SquareMeters = this.Area;
  const status = "Pendiente";

  this.afAuth.user.pipe(take(1)).subscribe(user =>{
    const uid = this.db.createPushId()
    this.db
    .object(`coordinatesUser/${user.uid}/${uid}`)
    .set({name,Coordenadas,SquareMeters,dateTime,timestamp,years,status,uid})
  }
  )
  this.openOtherDialog();
}

openOtherDialog() {
  this.dialog.open(this.secondDialog);
}


}
