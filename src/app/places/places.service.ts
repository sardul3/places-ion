import { Place } from './place.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places: Place[] = [
    // tslint:disable-next-line: max-line-length
    new Place('p1', 'Kathmandu', 'Cap of Nepal', 'https://cdn.getyourguide.com/img/tour_img-2980306-146.jpg', 233.99, new Date('2019-01-01'), new Date('2019-03-24')),
    // tslint:disable-next-line: max-line-length
    new Place('p2', 'Pokhara', 'Nature city of Nepal', 'https://cdn.getyourguide.com/img/tour_img-2246117-148.jpg', 333.99, new Date('2020 -02-11'), new Date('2020-03-14')),
    // tslint:disable-next-line: max-line-length
    new Place('p3', 'Manang', 'Nature city of Nepal', 'https://images.squarespace-cdn.com/content/v1/5a87961cbe42d637c54cab93/1524449741682-TFJV2O92DIUYFK58MEYF/ke17ZwdGBToddI8pDm48kNCH0IFo-E28D0rm_d_wnF4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKczdH3qUBwO6oWXP_OkYMa5KbLFw5Om5Yp_Nt25Y6nc5ZZuUUY1FOqARMqv9i1pcqr/annapurna+circuit+trekking+%7C+manang+%7C+marshyangdi+valley+%7C+acclimatization+in+manang+%7C+part+3+%7C+laidback+trip?format=1500w', 163.99, new Date('2019-05-01'), new Date('2019-08-04')),

  ];
  getPlaces() {
    return [...this.places];
  }

  getPlace(id: string) {
    return {...this.places.find(place => place.id === id)};
  }
  constructor() { }
}
