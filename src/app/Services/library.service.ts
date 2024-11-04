import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { LocationService } from './location.service';
import { forkJoin } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(public http:HttpClient,private shared:SharedService,private locationService: LocationService) {}
  library:any[]=[]; 


  

   getAlllibrary() {
    this.http.get(this.shared.getSharedUrl() + "Library/libraries").subscribe(result => {
      this.library = result as any[];
      console.log(this.library);
      this.getLocationsForLibraries(); 
    }, err => {
      console.log(err.message);
    });
  }

  private getLocationsForLibraries() {
    const locationRequests = this.library.map(lib => 
      this.locationService.getLocationName(lib.latitude, lib.longitude)
    );
console.log(locationRequests);
    forkJoin(locationRequests).subscribe(locations => {
      this.library = this.library.map((lib, index) => ({
        ...lib,
        locationName: locations[index].display_name 
      }));
      console.log(this.library);
    });
  }
}
