import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Apiservices {

  private baseUrl = environment.apiBaseUrl; 

    constructor(
        private http: HttpClient,
        //private modalService: ModalService,
    ){}

    post(url: string, data: any, callback: Function) {
        //this.modalService.showLoading();
        this.http.post<any>(`${this.baseUrl}/${url}`, data).subscribe({
            next: (response) => {
                //this.modalService.closeLoading();
                if(response.ok){
                    callback(response.data);
                }else{
                    //this.modalService.show(response.error);
                }
            },
            error: (error) => {
                //this.modalService.closeLoading();
                if(error.error.msg){
                    //this.modalService.show(error.error.msg);
                }else{
                   // this.modalService.show(error.message);
                }
            }
        })
    }
}
