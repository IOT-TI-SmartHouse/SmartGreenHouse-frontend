import { Component, OnInit } from '@angular/core';
import { MouseEvent} from '@agm/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  // google maps zoom level
  zoom = 8;

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  color = 'green';
  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      color: this.color,
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      color: 'orange',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      color: 'red',
      draggable: true
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  update(sensorId: string, sensorData: any[]) {
    for (const marker in this.markers) {
      if (marker['sensorId'] === sensorData['_id']) {
        marker['temperature'] = sensorData['value'];
        break;
      }
    }
    this.markers.push({sensorId: sensorData[0].name, lat: 0, lng: 0, draggable: true});
    console.log(this.markers);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


}

  // just an interface for type safety.
  interface Marker {
    sensorId?: string;
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    color?: string;
    temperature?: number;
    humidity?: number;
}
