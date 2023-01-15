import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class MehmonService {


  api = environment.baseApi + "/api/mehmon";

  constructor(private http: HttpClient) { }
  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api, {
      params: params

    });
  }

  create(mehmon: any): Observable<any> {
    return this.http.post(this.api, mehmon);
  }

  update(mehmon: any): Observable<any> {
    return this.http.put(this.api, mehmon);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(this.api + "/" + id);
  }
}
