import { IonItemSliding, LoadingController } from '@ionic/angular';
import { BookingsService } from './bookings.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Booking } from './booking.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  bookings: Booking[];
  bookingsSub: Subscription;
  constructor(private bookingsService: BookingsService,
              private router: Router,
              private loadingController: LoadingController) { }

  ngOnInit() {
   this.bookingsSub = this.bookingsService.getBookings().subscribe(bookings => {
     this.bookings = bookings;
   });
  }

  onBookingDelete(bookingId: string, selectedBooking: IonItemSliding) {
    this.loadingController.create({message: 'deleting booking..'}).then(loadingEl => {
      selectedBooking.close();
      loadingEl.present();
      this.bookingsService.deleteBooking(bookingId).subscribe(bookings => {
        loadingEl.dismiss();
      });
      });
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }

}
