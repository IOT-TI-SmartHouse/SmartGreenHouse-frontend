import { Component, OnInit } from '@angular/core';
import { MouseEvent} from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  // google maps zoom level
  zoom = 4;

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  color = 'green';
  markers: Marker[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  update(sensorId: string, temperature?: number, humidity?: number) {
    let nodeExists = false;
    for (const marker in this.markers) {
      if ((marker as any).sensorId === sensorId) {
        if (temperature !== null || temperature !== undefined) {
          marker['temperature'] = temperature;
        }
        if (humidity !== null || humidity !== undefined) {
          marker['humidity'] = humidity;
        }
        nodeExists = true;
        // console.log('updated node: ' + sensorId);
      }
    }
    if (!nodeExists) {
      // console.log('updating a non-existing node is not possible: ' + sensorId);
    }
  }

  create(sensorId: string, sensorName: string, latitude: number, longitude: number) {
    for (const marker in this.markers) {
      if (marker['sensorId'] === sensorId) {
        console.log('creating an already existing node is not allowed. Sensor id: ' + sensorId);
        return;
      }
    }
    console.log('created node: ' + sensorId);
    this.markers.push({sensorId: sensorId, label: sensorName, lat: latitude, lng: longitude, draggable: false});
    console.log('markers size: ' +  this.markers.length);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}

  // just an interface for type safety.
  interface Marker {
    sensorId: string;
    lat: number;
    lng: number;
    label: string;
    draggable: boolean;
    color?: string;
    temperature?: number;
    humidity?: number;
}
