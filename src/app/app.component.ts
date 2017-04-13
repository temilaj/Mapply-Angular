import { Component, OnInit } from '@angular/core';
import {  trigger,  state,  style,  animate,  transition} from '@angular/animations';
import { MarkerService } from "./services/marker.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkerService],
  animations: [
    trigger('heroState', [
      state('addMarker', style({height: '*'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class AppComponent implements OnInit{
  title = 'Mapply';
  appState: string = 'inactive';
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
    // console.log($event)
    this.lat = $event.coords.lat,
    this.long = $event.coords.lng;
    this.appState = 'addMarker';
  }
  
  modalSubmit(){
    let newMarker = {
      name: this.markerName,
      lat: this.lat,
      long: this.long,
      draggable:false,
    }
    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
    this.markerName = '';
    this.appState = '';
    
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
  
  changeState(updatedState) {
    this.appState = updatedState;
  }
}
  //marker type
interface marker{
  name?: string,
  lat: number,
  long: number,
  draggable: boolean,
}