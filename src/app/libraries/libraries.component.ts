import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../Services/library.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.css'],
})
export class LibrariesComponent implements OnInit {
  _filterText: string = '';
  map!: L.Map;
  currentMarker: L.Marker | null = null;

  constructor(public Library: LibraryService, private router: Router) {}

  ngOnInit(): void {
    this.Library.getAlllibrary();
    this.initMap();
  }

  initMap() {
    L.Icon.Default.imagePath = 'assets/Images/';

    this.map = L.map('map').setView(
      [31.954115363950528, 35.91282399125154],
      10
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);
  }

  showLocation(library: any) {
    this.map.setView([library.latitude, library.longitude], 14);

    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }

    this.currentMarker = L.marker([library.latitude, library.longitude])
      .addTo(this.map)
      .bindPopup(library.locationName)
      .openPopup();
  }
  goToBooks(libraryName: string, libraryId: string) {
    this.router.navigate([`libraries`, libraryName, 'books', libraryId]);
  }
}
