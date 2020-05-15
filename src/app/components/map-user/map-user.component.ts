import { Component, OnInit } from '@angular/core';
import { environment } from  '../../../environments/environment'
import * as Mapboxgl from  'mapbox-gl'
import * as MapboxDraw from '@mapbox/mapbox-gl-draw'
import * as turf from '@turf/turf'
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-user',
  templateUrl: './map-user.component.html',
  styleUrls: ['./map-user.component.scss']
})
export class MapUserComponent implements OnInit {

  mapa: Mapboxgl.Map;
  constructor(private router: Router) { }

  ngOnInit(): void {
    Mapboxgl.accessToken = environment.mapbox;


    this.mapa = new Mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40], // starting position
    zoom: 9 // starting zoom
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
        var {coordinates} = draw.getAll().features[0].geometry;
        console.log(coordinates);
      var area = turf.area(data);
      // restrict to area to 2 decimal points
      var rounded_area = Math.round(area * 100) / 100;
      answer.innerHTML =
      '<p><strong>' +
      rounded_area +
      coordinates+
      '</strong></p><p>square meters</p>';
      } else {
      answer.innerHTML = '';
      if (e.type !== 'draw.delete')
      alert('Use the draw tools to draw a polygon!');
      }
}
}
}
