import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MarkerService } from "app/services/marker.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkerService],
  animations: [
    trigger('modalState', [
      state('addMarker', style({opacity: 1, transform: 'translateX(0)'})),
      // state('inactive', style({opacity: 0, transform: 'translateX(100%)'})),
      transition('void <=> *', [
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
  markerModalState: string = 'inactive';
  lat: number = 6.5244;
  long: number = 3.3792;
  zoomLevel: number = 6;
  markerName:string;
  markerLatitude:string;
  markerLongitude:string;
  markerDraggable:string;

  markers: marker[] = [];

  constructor(private _markerService:MarkerService) {
  
  }

  ngOnInit() {
    this.markers = this._markerService.getMarkers();
  }

  mapClicked($event:any) {
    this.lat = $event.coords.lat,
    this.long = $event.coords.lng;
    this.markerModalState = 'addMarker';
  }
  
  modalSubmit() {
    let newMarker = {
      name: this.markerName,
      lat: this.lat,
      long: this.long,
      draggable:false,
    }
    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
    this.markerName = '';
    this.markerModalState = 'inactive';
    
  }

  clickedMarker(marker:marker, index:number) {
  }
  markerDragEnd(marker, $event) {
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

  addMarker() {
    let isDraggable
    this.markerDraggable === "yes" ? isDraggable = true : isDraggable = false;

    let newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLatitude),
      long: parseFloat(this.markerLongitude),
      draggable: isDraggable,
    }
    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
    this.markerName = "";
    this.markerLatitude = "";
    this.markerLongitude = "";
    this.markerDraggable = "";
  }

  removeMarker(marker) {
    for (let i =0; i< this.markers.length; i++) {
      if (marker.lat == this.markers[i].lat && marker.long == this.markers[i].long) {
        this.markers.splice(i,1);
      }
    }
    this._markerService.removeMarker(marker);
  }
  
  changeState(updatedState) {
    this.markerModalState = updatedState;
  }
}

interface marker{
  name?: string,
  lat: number,
  long: number,
  draggable: boolean,
}