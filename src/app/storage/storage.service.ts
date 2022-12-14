import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  /**
   * Save data to key
   *
   * @param key
   * @param data
   */
  async setData(key: string, data: any) {
    let finall = [];
    console.log(data)
    if (data != 'Delete')
    {
    let response = await this.getData('favorite');

    if (response != null){
        finall.push(...response);
    }
        finall.push(data);
      }
    await Preferences.set({
      // key: key,
      key,
      value: JSON.stringify(finall),
    });
  }

  /**
   * Get data from key
   *
   * @param key
   */
  async getData(key: string) {
    const {value} = await Preferences.get({
      key
    });
    return JSON.parse(value);
  }
}