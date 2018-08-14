import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthenticateKeyResult } from '../../models/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCdKeyService {
  constructor(private http: HttpClient) {}

  validateKey(cdKey: string) {
    return this.http.post<IAuthenticateKeyResult>('/authenticateKey', {
      key: cdKey
    });
    // .catch((err: any) => {
    //   console.log('FUCK OFF');
    //   console.log(err);
    //   return Promise.reject(err);
    // });
  }

  registerKey(cdKey: string) {
    return this.http.post<boolean>('/registerKey', {
      id: cdKey
    });
  }
}
