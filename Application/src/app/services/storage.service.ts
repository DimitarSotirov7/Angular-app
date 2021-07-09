import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  localStorage = localStorage;
  
  setItem(key: string, item: boolean): boolean {
    this.localStorage.setItem(key, JSON.stringify(item));
    return item;
  }

  getItem(key: string): boolean {
    let value = this.localStorage.getItem(key);
    const result = value === null ? false : JSON.parse(value) === false ? false : true;
    return result;
  }
}
