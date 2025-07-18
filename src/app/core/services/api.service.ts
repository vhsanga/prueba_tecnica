import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { delay, Observable } from 'rxjs';
import { ModalService } from './modal.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiBaseUrl; 

    constructor(
        private http: HttpClient,
        private modalService: ModalService
    ){}

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async doPost(url: string, data: any, callback: Function) {
        this.modalService.showLoading("Espere...");
        await this.sleep(2000);
        this.post(url, data).subscribe({
            next: (response:any) => {
                this.modalService.closeLoading();
                callback(response);
            },
            error: (error) => {
                this.modalService.closeLoading();
                if(error.msg){
                    this.modalService.showError(error.error.msg);
                }else{
                    this.modalService.showError(error.message);
                }
            }
        })
    }

    async doGet(url: string, params: any, callback: Function) {
        await this.sleep(2000);
        this.get(url, params).subscribe({
            next: (response:any) => {
                if(response.data) {
                  callback(response.data);
                }else{
                  callback(response);
                }
                
            },
            error: (error) => {
                if(error.msg){
                    this.modalService.showError(error.error.msg);
                }else{
                    this.modalService.showError(error.message);
                }
            }
        })
    }


    async doPut(url: string, data: any, callback: Function) {
        this.modalService.showLoading("Espere...");
        await this.sleep(2000);
        this.put(url, data).subscribe({
            next: (response:any) => {
                this.modalService.closeLoading();
                callback(response);
            },
            error: (error) => {
                this.modalService.closeLoading();
                if(error.msg){
                    this.modalService.showError(error.error.msg);
                }else{
                    this.modalService.showError(error.message);
                }
            }
        })
    }

    async doDelete(url: string,  callback: Function) {
        this.modalService.showLoading("Espere...");
        await this.sleep(2000);
        this.delete(url).subscribe({
            next: (response:any) => {
                this.modalService.closeLoading();
                callback(response);
            },
            error: (error) => {
                this.modalService.closeLoading();
                if(error.msg){
                    this.modalService.showError(error.error.msg);
                }else{
                    this.modalService.showError(error.message);
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
