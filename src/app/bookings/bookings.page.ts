import { IonItemSliding } from '@ionic/angular';
import { BookingsService } from './bookings.service';
import { Component, OnInit } from '@angular/core';
import { Booking } from './booking.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[];
  constructor(private bookingsService: BookingsService,
              private router: Router) { }

  ngOnInit() {
    this.bookings = this.bookingsService.getBookings();
  }

  onBookingDelete(bookingId: string, selectedBooking: IonItemSliding) {
    selectedBooking.close();
    this.bookingsService.deleteBooking(bookingId);

  }

}
