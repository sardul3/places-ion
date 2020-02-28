import { PlacesService } from './../places.service';
import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  places: Place[];

  constructor(private placesService: PlacesService,
              private router: Router) { }

  ngOnInit() {
    this.places = this.placesService.getPlaces();
  }

  onEditOffer(placeId: string, slidingItem: IonItemSliding) {
    this.router.navigateByUrl('/places/tabs/offers/edit/' + placeId);
    slidingItem.close();
  }

}
