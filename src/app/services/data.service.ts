import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { IChild, ISetting, ISleep, IUserIn } from '../data/contracts';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private constants: Constants) { }

  // USERS
  public register(user: IUserIn) {
    return this.http.post<boolean>(this.constants.HTTPS_API_ENDPOINT + `users/register`, user);
  }

  public login(email: string, password: string) {
    return this.http.get<string>(this.constants.HTTPS_API_ENDPOINT + `users/login?email=${email}&password=${password}`);
  }

  public checkEmailExists(email: string) {
    return this.http.get<boolean>(this.constants.HTTPS_API_ENDPOINT + `users/check/email?email=${email}`)
  }

  public getUserChildren(userId: string) {
    return this.http.get<IChild[]>(this.constants.HTTPS_API_ENDPOINT + `users/${userId}/children`)
  }

  public AddChild(userId: string, childName: string) {
    return this.http.post<IChild>(this.constants.HTTPS_API_ENDPOINT + `users/${userId}/add/child?name=${childName}`, null)
  }

  // SLEEP
  public saveSleep(sleep: ISleep) {
    return this.http.post<boolean>(this.constants.HTTPS_API_ENDPOINT + 'sleep', sleep)
  }

  // SETTINGS
  public saveSetting(setting: ISetting) {
    return this.http.post<ISetting>(this.constants.HTTPS_API_ENDPOINT + 'settings', setting)
  }

  public getSettings(){
    return this.http.get<ISetting[]>(this.constants.HTTPS_API_ENDPOINT + 'settings')
  }

}
