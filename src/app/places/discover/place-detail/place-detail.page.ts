import { AuthService } from './../../../auth/auth.service';
import { BookingsService } from './../../../bookings/bookings.service';
import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { Place } from './../../place.model';
import { PlacesService } from './../../places.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  placesSub: Subscription;
  bookablePlace = false;

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService,
              private router: Router,
              private modalController: ModalController,
              private actionSheetController: ActionSheetController,
              private bookingsService: BookingsService,
              private loadingController: LoadingController, 
              private authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.router.navigateByUrl('/places/tabs/discover');
        return;
      }

      this.placesSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
       this.place = place;
       this.bookablePlace = place.userId !== this.authService.getUserId();
     });

    });
  }

  openBookModal(mode: 'select' | 'random') {
    this.modalController.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place, selectedMode: mode}
    }).then(modal => {modal.present(); return modal.onDidDismiss(); }).then(resultData => {
      if (resultData.role === 'confirm') {
        this.loadingController.create({message: 'booking place..'}).then(loadingEl => {
          loadingEl.present();
          const data = resultData.data.bookingData;
          // tslint:disable-next-line: max-line-length
          this.bookingsService.addBooking(this.place.id, this.place.title, this.place.imageUrl, data.firstName, data.lastName, data.guestNumber, data.dateFrom, data.dateTo).subscribe(() => {
            loadingEl.dismiss();
            this.router.navigateByUrl('/bookings');
          });
        });
      }
    });
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

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
