import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIsAuthenticated = true;
  private userId = 'sagar';


  getUserIsAuthenticated() {
    return this.userIsAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  constructor() { }

  logIn() {
    this.userIsAuthenticated = true;
  }

  logOut() {
    this.userIsAuthenticated = false;
  }
}
