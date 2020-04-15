import { Injectable } from "@angular/core";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { RequestModel } from "./request.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class RequestService {
    constructor(private http: HttpClient) { }


    getcount() {
        let headers = this.createRequestHeader();

        const promise = new Promise((resolve, reject) => {
            this.http.get<any>("http://test.canta.io/user/count"
            )
            .toPromise().then((data: any) => {
                console.log("POST Request successful  ", data);
                resolve(data);
            }).catch (function(result) {
                reject(result)
            });
            })
        return promise;
       }

        private createRequestHeader() {
            // set headers here e.g.
            let headers = new HttpHeaders({
                "partnerID":"36ed8e69648f76175fc8ec148bb9cec5",
                "partnerKey":"bb9cec5b1069d7b3d816911995bb",
            });
            return headers;
        }

        register(email: string) {

        let headers = this.createRequestHeader();
        const promise = new Promise((resolve, reject) => {
            this.http.post<any>("http://test.canta.io/user/signup",
            {
            "email":  email,
            },)
            .toPromise().then((data: any) => {
                console.log("POST Request successful ", data);
                resolve(data);
            }).catch (function(result) {
                reject(result)
            });
            })
        return promise;
        }


        logout() {
        }

        resetPassword(email) {
        }
}
