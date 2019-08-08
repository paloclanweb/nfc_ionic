import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://192.168.43.35:3000/graphql';

  constructor() { }
}
