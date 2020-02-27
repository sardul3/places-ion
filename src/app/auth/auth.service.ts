import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIsAuthenticated = true;

  getUserIsAuthenticated() {
    return this.userIsAuthenticated;
  }

  constructor() { }

  logIn() {
    this.userIsAuthenticated = true;
  }

  logOut() {
    this.userIsAuthenticated = false;
  }
}
