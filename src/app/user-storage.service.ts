import { Injectable } from '@angular/core';
import {User} from "./interfaces/user";
import {Media} from "./interfaces/media";

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  getAllUsers(): User[] {
    const users = localStorage.getItem('users');
    if(users) {
      return JSON.parse(users);
    }
    return [];
  }

  saveUserToList(user: User) {
    const users = this.getAllUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUserById(userId: number): User | null {
    const users = this.getAllUsers();
    return users.find(user => user.id === userId) || null;
  }

  getCurrentUser(): User | null {
    const userId = localStorage.getItem('currentUser');
    if(userId) {
      return this.getUserById(Number(userId));
    } else {
      this.createNewUser({"id":1,"name":"test","email":"test@test.com","password":"test","avatar":"/assets/logo/mini-logo.svg","watch_list":{"id":1,"user_id":1,"movies":[],"created_at":"1/6/2024","updated_at":"1/6/2024"},"created_at":"1/6/2024","updated_at":"1/6/2024"});
      return this.getUserById(Number(userId));
    }
  }

  addMovieToWatchList(user: User, movie: Media, removeifExist: boolean = false) {
    if(user) {
      const isMovieAlreadyInList = user.watch_list.movies.find(media => media.id === movie.id);
      if(isMovieAlreadyInList) {
        if(removeifExist) {
          user.watch_list.movies = user.watch_list.movies.filter(media => media.id !== movie.id);
          this.saveUser(user);
          return false;
        }
        return true;
      }
      console.log('adding movie to list');
      user.watch_list.movies.push(movie);
      this.saveUser(user);
      return true;
    }
    return false;
  }

  setCurrentUser(userId: number) {
    localStorage.setItem('currentUser', userId.toString());
  }

  createNewUser(user: User) {
    this.saveUserToList(user);
    this.setCurrentUser(user.id);
  }

  isMovieInWatchList(movieId: number): boolean {
    const user = this.getCurrentUser();
    if(user) {
      return user.watch_list.movies.find(media => media.id === movieId) !== undefined;
    }
    return false;
  }

  saveUser(user: User) {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === user.id);
    if(index !== -1) {
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}
