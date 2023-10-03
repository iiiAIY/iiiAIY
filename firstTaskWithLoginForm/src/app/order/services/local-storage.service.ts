import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getFormFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  saveFormToLocalStorage (key:string, value: any):void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear() {
    localStorage.clear();
  }

}
