import { Component, OnInit } from '@angular/core';
import { MouseEvent} from '@agm/core';
import { MapsAPILoader} from '@agm/core';

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

  // max and min values for temperature
  minTemp = 15;
  maxTemp = 30;

  middlePoint = ( this.minTemp + this.maxTemp ) / 2;
  scale = 255 / ( this.middlePoint - this.minTemp);

  color = 'green';
  markers: Marker[] = [];
  latlngBounds;
  MapsAPILoader;

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.MapsAPILoader = mapsAPILoader;
    this.updateBounds();
  }

  ngOnInit() {
  }

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
    if (!nodeExists) {
      console.log('updating a non-existing node is not possible: ' + sensorId);
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
    for (const marker in this.markers) {
      if (marker['sensorId'] === sensorId) {
        console.log('creating an already existing map node is not allowed. Sensor id: ' + sensorId);
        return;
      }
    }
    console.log('created map node: ' + sensorName);
    this.markers.push({sensorId: sensorId, label: sensorName, lat: latitude, lng: longitude, draggable: false, radius: 10});
    console.log(this.markers);

    this.updateBounds();
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  getColorValue(value: number): string {
    if (value <= this.minTemp ) {
      return 'FF0000';
    }
    if (value >= this.maxTemp ) {
      return '00FF00';
    }

    if (value < ((this.minTemp - this.maxTemp) / 2)) {
      return `FF${value - this.minTemp * this.scale}00`;
    } else {
      return `${value - this.middlePoint * this.scale}FF00`;
    }
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
