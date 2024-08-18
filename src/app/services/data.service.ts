import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { IChild, IDiaperDetails, IFood, IPumping, ISetting, ISleep, ISleepDetailOptions, ISolids, IUserIn } from '../data/contracts';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private constants: Constants) {}

  // USERS
  public register(user: IUserIn) {
    return this.http.post<string>(this.constants.HTTPS_API_ENDPOINT + `users/register`, user);
  }

  public login(firebaseId: string) {
    return this.http.get<string>(this.constants.HTTPS_API_ENDPOINT + `users/login?firebaseId=${firebaseId}`);
  }

  public checkEmailExists(email: string) {
    return this.http.get<boolean>(this.constants.HTTPS_API_ENDPOINT + `users/check/email?email=${email}`);
  }

  public getUserChildren(userId: string) {
    return this.http.get<IChild[]>(this.constants.HTTPS_API_ENDPOINT + `users/${userId}/children`);
  }

  public AddChild(userId: string, childName: string) {
    return this.http.post<IChild>(this.constants.HTTPS_API_ENDPOINT + `users/${userId}/add/child?name=${childName}`, null);
  }

  // SLEEP
  public saveSleep(sleep: ISleep) {
    return this.http.post<boolean>(this.constants.HTTPS_API_ENDPOINT + 'sleep', sleep);
  }

  public getSleepDetailOptions() {
    return this.http.get<ISleepDetailOptions>(this.constants.HTTPS_API_ENDPOINT + 'sleep/detail/options');
  }

  // SETTINGS
  public saveSetting(setting: ISetting) {
    return this.http.post<ISetting>(this.constants.HTTPS_API_ENDPOINT + 'settings', setting);
  }

  public getSettings() {
    return this.http.get<ISetting[]>(this.constants.HTTPS_API_ENDPOINT + 'settings');
  }

  //FOOD

  public saveFoodDetails(food: IFood) {
    return this.http.post<IFood>(this.constants.HTTPS_API_ENDPOINT + 'food', food);
  }

  public saveSolidDetails(solids: ISolids) {
    return this.http.post<boolean>(this.constants.HTTPS_API_ENDPOINT + 'food/solids', solids);
  }

  public getSolidFoodOptions() {
    return this.http.get<{ [key: string]: string }>(this.constants.HTTPS_API_ENDPOINT + 'food/solid/options');
  }

  public getSolidsReactionOptions() {
    return this.http.get<{ [key: string]: string }>(this.constants.HTTPS_API_ENDPOINT + 'food/solid/reaction/options');
  }

  //POTTY
  public saveDiaperDetails(diaperDetails: IDiaperDetails) {
    return this.http.post<boolean>(this.constants.HTTPS_API_ENDPOINT + 'potty/save', diaperDetails);
  }

  //PUMPING
  public savePumping(pumping: IPumping) {
    return this.http.post<boolean>(this.constants.HTTPS_API_ENDPOINT + 'food/pumping', pumping);
  }
}
