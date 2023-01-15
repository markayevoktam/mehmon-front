import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bino } from '../model/bino';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class BinoService {
  api = environment.baseApi + "/api/bino";

  constructor(private http: HttpClient) { }
  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api, {
      params: params

    });
  }

  create(bino: any): Observable<any> {

    return this.http.post(this.api, bino);
  }
  update(bino: any): Observable<any> {

    return this.http.put(this.api, bino);
  }
  deleteById(id: number): Observable<any> {

    return this.http.delete(this.api + "/" + id);
  }
}
