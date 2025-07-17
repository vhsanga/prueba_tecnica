import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiBaseUrl; 

    constructor(
        private http: HttpClient,
    ){}

    doPost(url: string, data: any, callback: Function) {
        //this.modalService.showLoading();
        this.post(url, data).subscribe({
            next: (response:any) => {
                //this.modalService.closeLoading();
                callback(response.data);
            },
            error: (error) => {
                //this.modalService.closeLoading();
                if(error.error.msg){
                    //this.modalService.show(error.error.msg);
                }else{
                    //this.modalService.show(error.message);
                }
            }
        })
    }

    doGet(url: string, params: any, callback: Function) {
        //this.modalService.showLoading();
        this.get(url, params).subscribe({
            next: (response:any) => {
                //this.modalService.closeLoading();
                if(response.data) {
                  callback(response.data);
                }else{
                  callback(response);
                }
                
            },
            error: (error) => {
                //this.modalService.closeLoading();
                if(error.error.msg){
                    //this.modalService.show(error.error.msg);
                }else{
                    //this.modalService.show(error.message);
                }
            }
        })
    }


    doPut(url: string, data: any, callback: Function) {
        //this.modalService.showLoading();
        this.put(url, data).subscribe({
            next: (response:any) => {
                //this.modalService.closeLoading();
                callback(response.data);
            },
            error: (error) => {
                //this.modalService.closeLoading();
                if(error.error.msg){
                    //this.modalService.show(error.error.msg);
                }else{
                    //this.modalService.show(error.message);
                }
            }
        })
    }

    doDelete(url: string,  callback: Function) {
        //this.modalService.showLoading();
        this.delete(url).subscribe({
            next: (response:any) => {
                //this.modalService.closeLoading();
                callback(response.data);
            },
            error: (error) => {
                //this.modalService.closeLoading();
                if(error.error.msg){
                    //this.modalService.show(error.error.msg);
                }else{
                    //this.modalService.show(error.message);
                }
            }
        })
    }

    get<T>(url: string, params?: any): Observable<T> {
      let httpParams = new HttpParams();
      if (params) {
        for (let key in params) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
      return this.http.get<T>(`${this.baseUrl}/${url}`, { params: httpParams });
    }

    post<T>(url: string, data: any): Observable<T> {
      return this.http.post<T>(`${this.baseUrl}/${url}`, data);
    }

    put<T>(url: string, data: any): Observable<T> {
      return this.http.put<T>(`${this.baseUrl}/${url}`, data);
    }

    delete<T>(url: string): Observable<T> {
      return this.http.delete<T>(`${this.baseUrl}/${url}`);
    }
}
