import { Injectable } from '@angular/core';
import { Init } from "app/init-markers";

@Injectable()
export class MarkerService extends Init{
    constructor(){
        super();/// to run the initializaiton in the Init class
        console.log('marker service initialized')
        this.load()
    }

    getMarkers(){
        let markers = JSON.parse(localStorage.getItem('markers'));
        return markers;
    }

    addMarker(newMarker){
        let markers = JSON.parse(localStorage.getItem('markers'));
        markers.push(newMarker);

        localStorage.setItem('markers', JSON.stringify(markers));        
    }

    updatemarker(marker, newLatitude, newLongitude){
        console.log(`updaing marker`,marker)

        let markers = JSON.parse(localStorage.getItem('markers'));

        for (let index = 0; index < markers.length; index++) {
            if(marker.lat == markers[index].lat && marker.long == markers[index].long){
                markers[index].lat = newLatitude;
                markers[index].long = newLongitude;
            }
        }   

        localStorage.setItem('markers', JSON.stringify(markers));                    

        // array.forEach(element => {
            
        // }); 
    }
    removeMarker(marker){
        let markers = JSON.parse(localStorage.getItem('markers'));

        for (let index = 0; index < markers.length; index++) {
            if(marker.lat == markers[index].lat && marker.long == markers[index].long){
                markers.splice(index,1);
            }
        }   

        localStorage.setItem('markers', JSON.stringify(markers));        
    }

}