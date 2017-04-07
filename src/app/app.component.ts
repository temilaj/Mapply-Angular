import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mapply';
  lat: number = 6.5244;
  long: number = 3.3792;
  zoomLevel: number = 10;

  markers: marker[] = [
    {
      name: 'Company A',
      lat: 6.5152,
      long: 3.3792,
      draggable: true
    },
    {
      name: 'Company B',
      lat: 6.5112,
      long: 3.1792,
      draggable: true
    },
    {
      name: 'Company C',
      lat: 6.5352,
      long: 3.6792,
      draggable: true
    }
  ];

  /**
   *
   */
  constructor() {
    
  }
  
  mapClicked($event:any){
    let newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      long: $event.coords.lng,
      draggable:false,
    }
    console.log(newMarker);
    this.markers.push(newMarker);

  }
  clickedMarker(marker:marker, index:number){
    console.log(marker);
    console.log(index);
  }
  markerDragEnd(marker, $event){
    console.log('dragged', marker, $event);

    let updatedMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      long: parseFloat(marker.long),
      draggable: marker.draggable,
    }
    let newLatitude = $event.coords.lat;
    let newLongitude = $event.coords.lng;
    
    console.log('dragged new', marker, $event);
  }

}
  //marker type
interface marker{
  name?: string,
  lat: number,
  long: number,
  draggable: boolean,
}