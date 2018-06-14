import { Component, OnInit } from '@angular/core';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // google maps zoom level
  zoom = 4;

  // initial center position for the map
  lat = 0;
  lng = 0;

  color = 'green';
  markers: Marker[] = [];
  latlngBounds;
  MapsAPILoader;

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.MapsAPILoader = mapsAPILoader;
    this.updateBounds();
  }

  ngOnInit() { }

  update(sensorId: string, temperature?: number, humidity?: number) {
    let nodeExists = false;
    for (const marker of this.markers) {
      if ((marker as any).sensorId === sensorId) {
        if (temperature !== null || temperature !== undefined) {
          marker.temperature = temperature;
        }
        if (humidity !== null || humidity !== undefined) {
          marker.humidity = humidity;
        }
        nodeExists = true;
      }
    }
    this.updateBounds();
  }

  updateBounds() {
    this.MapsAPILoader.load().then(() => {
      this.latlngBounds = new window['google'].maps.LatLngBounds();
      this.markers.forEach((location) => {
        this.latlngBounds.extend(new window['google'].maps.LatLng(location.lat, location.lng));
      });
    });
  }

  create(sensorId: string, sensorName: string, latitude: number, longitude: number) {
    this.markers.push({sensorId: sensorId, label: sensorName, lat: latitude, lng: longitude, draggable: false, radius: 10});
    this.updateBounds();
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
  radius?: number;
}
