import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { HttpOptions } from '@capacitor/core/types/core-plugins';

@Injectable({
  providedIn: 'root',
})
export class HttpConnection {
  async get(options: HttpOptions) {

    return await CapacitorHttp.get(options);
  }

}
