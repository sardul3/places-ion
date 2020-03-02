import { Place } from './place.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places =  new BehaviorSubject<Place[]>(
    [
      // tslint:disable-next-line: max-line-length
      new Place('p1', 'Kathmandu', 'Cap of Nepal', 'https://cdn.getyourguide.com/img/tour_img-2980306-146.jpg', 233.99, new Date('2019-01-01'), new Date('2019-03-24'), 'sagar'),
      // tslint:disable-next-line: max-line-length
      new Place('p2', 'Pokhara', 'Nature city of Nepal', 'https://cdn.getyourguide.com/img/tour_img-2246117-148.jpg', 333.99, new Date('2020-02-11'), new Date('2020-03-14'), 'poudel'),
      // tslint:disable-next-line: max-line-length
      new Place('p3', 'Manang', 'Nature city of Nepal', 'https://images.squarespace-cdn.com/content/v1/5a87961cbe42d637c54cab93/1524449741682-TFJV2O92DIUYFK58MEYF/ke17ZwdGBToddI8pDm48kNCH0IFo-E28D0rm_d_wnF4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKczdH3qUBwO6oWXP_OkYMa5KbLFw5Om5Yp_Nt25Y6nc5ZZuUUY1FOqARMqv9i1pcqr/annapurna+circuit+trekking+%7C+manang+%7C+marshyangdi+valley+%7C+acclimatization+in+manang+%7C+part+3+%7C+laidback+trip?format=1500w', 163.99, new Date('2019-05-01'), new Date('2019-08-04'), 'sagar'),
    ]
  );

  constructor() { }

  getPlaces() {
    return this.places.asObservable();
  }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(place => place.id === id)};
    }));
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date, userId: string) {
    // tslint:disable-next-line: max-line-length
    const newPlace = new Place(Math.random().toString(), title, description, 'https://cdn.getyourguide.com/img/tour_img-2980306-146.jpg', price, dateFrom, dateTo, userId);

    this.places.pipe(take(1)).subscribe( places => {
      this.places.next(places.concat(newPlace));
    });
  }

  editPlace(placeId: string, title: string, description: string ) {
    return this.places.pipe(take(1), delay(1500), tap(places => {
      const oldPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const oldPlace = places[oldPlaceIndex];
      const updatedPlaces = [...places];
      // tslint:disable-next-line: max-line-length
      updatedPlaces[oldPlaceIndex] = new Place(oldPlace.id, title, description, oldPlace.imageUrl, oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
      this.places.next(updatedPlaces);
    }));
  }
}
