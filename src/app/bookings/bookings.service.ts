import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private bookings: Booking[] = [
    {id: 'b1', placeId: 'p1', userId: 'u3', placeTitle: 'Paris', guestNumber: 4},
    {id: 'b2', placeId: 'p2', userId: 'u3', placeTitle: 'Dallas', guestNumber: 2},
    {id: 'b3', placeId: 'p3', userId: 'u3', placeTitle: 'Rome', guestNumber: 3}
  ]

  constructor() { }

  getBookings() {
    return [...this.bookings];
  }

  deleteBooking(bookingId: string) {
    return [...this.bookings.filter( booking => booking.id === bookingId)];
  }
}
