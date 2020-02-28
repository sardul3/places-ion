import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { Place } from './../../place.model';
import { PlacesService } from './../../places.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService,
              private router: Router,
              private modalController: ModalController,
              private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.router.navigateByUrl('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

  openBookModal(actionType: string) {
    this.modalController.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place}
    }).then(modal => {modal.present(); });
  }

  onBookClicked() {
    this.actionSheetController.create({
      header: 'Select an action',
      buttons: [
        {
          text: 'Select Dates',
          handler: () => {
            this.openBookModal('select');
          }
        },
        {
          text: 'Select Random',
          handler: () => {
            this.openBookModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => actionSheetEl.present());
  }
}
