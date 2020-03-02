import { AuthService } from './../../auth/auth.service';
import { PlacesService } from './../places.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  places: Place[];
  relPlaces: Place[];
  placesSub: Subscription;
  constructor(private placesService: PlacesService,
              private authService: AuthService) { }

  ngOnInit() {
    this.placesSub = this.placesService.getPlaces().subscribe(places => {
      this.places = places;
      this.relPlaces = this.places;
    });
  }

  onSegmentChange(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
    console.log(this.relPlaces);

    if (event.detail.value === 'all') {
      this.relPlaces = this.places;
    }
    if (event.detail.value === 'bookable') {
      const filteredPlaces = [...this.places].filter(place => {
        return place.userId !== this.authService.getUserId();
      });
      this.relPlaces = filteredPlaces;
    }
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
