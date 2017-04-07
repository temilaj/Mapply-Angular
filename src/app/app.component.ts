import { Component, OnInit } from '@angular/core';
import { MarkerService } from "./services/marker.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkerService]
})
export class AppComponent implements OnInit{
  title = 'Mapply';
  lat: number = 6.5244;
  long: number = 3.3792;
  zoomLevel: number = 9;

  markerName:string;
  markerLatitude:string;
  markerLongitude:string;
  markerDraggable:string;

  markers: marker[] = [
  ];

  /**
   *
   */
  constructor(private _markerService:MarkerService) {
  
}

  ngOnInit(){
    this.markers = this._markerService.getMarkers();
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
    // console.log(marker);
    // console.log(index);
  }
  markerDragEnd(marker, $event){
    let updatedMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      long: parseFloat(marker.long),
      draggable: marker.draggable,
    }
    let newLatitude = $event.coords.lat;
    let newLongitude = $event.coords.lng;

    this._markerService.updatemarker(updatedMarker, newLatitude, newLongitude)
  }

  addMarker(){
    let isDraggable
    this.markerDraggable === "yes" ? isDraggable = true : isDraggable = false;

    var newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLatitude),
      long: parseFloat(this.markerLongitude),
      draggable: isDraggable,
    }
    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
    console.log(`adding marker ${newMarker}`)
  }

  removeMarker(marker){
    console.log('Removing marker...');
    for(var i =0; i< this.markers.length; i++){
      if(marker.lat == this.markers[i].lat && marker.long == this.markers[i].long){
        this.markers.splice(i,1);
      }
    }
    this._markerService.removeMarker(marker);
  }

}
  //marker type
interface marker{
  name?: string,
  lat: number,
  long: number,
  draggable: boolean,
}