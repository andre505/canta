import { Component, Inject } from '@angular/core';
import { RequestModel } from './request.model';
import { RequestService } from "./request.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from './DialogData';

import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Canta';
  request: RequestModel;
  isfetching = false;
  status = '';
  count = '';
  message = '';
  status2= '';
  isRegisterSuccess = false;
  closeResult: string;
  animal: string;
  name: string;
  isQuerySuccess = false;
  isQuerySuccess2 = false;
  ismodelerror = false;

  constructor(private reqservice: RequestService, private modalService: NgbModal, public dialog: MatDialog) {
    this.request = new RequestModel();
   }

   check() {

    this.isQuerySuccess = false;
    this.message = '';
    this.isRegisterSuccess = false;

    if (!this.request.email){
      this.isQuerySuccess = true;
      this.ismodelerror = true;
      this.message = 'Please enter a valid email address';
      return;
    }

    this.isfetching = true;


      //request
    this.reqservice.register(this.request.email)
    .then((data) => {
        this.isfetching = false;
        // this.loginresp = new LoginResp();
        let resp = JSON.stringify(data);
        //let des = <LoginResp>JSON.parse(resp);
        let myObj = JSON.parse(resp)
        //this.status = myObj.description;
        console.log(resp);
        this.isQuerySuccess = true;
        if (myObj.ResponseCode != "200") {
          this.ismodelerror = true;
          this.message = myObj.message;
          this.status = myObj.message;
        }
        else {
          //this.message = myObj.message;
          this.status = 'success';
          //
                      this.reqservice.getcount()
                      .then((data1) => {
                          this.isfetching = false;
                          // this.loginresp = new LoginResp();
                          let resp1 = JSON.stringify(data1);
                          //let des = <LoginResp>JSON.parse(resp);
                          let myObj1 = JSON.parse(resp1)
                          //this.status = myObj.description;
                          console.log(resp1);

                          if (myObj1.ResponseCode != "200") {
                          this.ismodelerror = true;
                          this.message = myObj1.message;
                          return;
                          }
                          else {
                            this.count = myObj1.count;
                            this.status2 = 'success';
                            this.isRegisterSuccess = true;
                          }
                          console.log(myObj.description);
                          console.log(status);
                      })
                      .catch(() => {
                        this.ismodelerror = true;
                          this.message='A Network Error Occurred.';
                      });         //
        }
    })
    .catch(() => {
        this.isfetching = false;
        this.status='A Network Error Occurred.';
    });
    //end request

   }


   //check 2
   check2() {

    this.isQuerySuccess2 = false;
    this.message = '';
    this.isRegisterSuccess = false;

    if (!this.request.email){
      this.isQuerySuccess2 = true;
      this.ismodelerror = true;
      this.message = 'Please enter a valid email address';
      return;
    }

    this.isfetching = true;


      //request
    this.reqservice.register(this.request.email)
    .then((data) => {
        this.isfetching = false;
        // this.loginresp = new LoginResp();
        let resp = JSON.stringify(data);
        //let des = <LoginResp>JSON.parse(resp);
        let myObj = JSON.parse(resp)
        //this.status = myObj.description;
        console.log(resp);
        this.isQuerySuccess2 = true;
        if (myObj.ResponseCode != "200") {
          this.ismodelerror = true;
          this.message = myObj.message;
          this.status = myObj.message;
        }
        else {
          //this.message = myObj.message;
          this.status = 'success';
          //
                      this.reqservice.getcount()
                      .then((data1) => {
                          this.isfetching = false;
                          // this.loginresp = new LoginResp();
                          let resp1 = JSON.stringify(data1);
                          //let des = <LoginResp>JSON.parse(resp);
                          let myObj1 = JSON.parse(resp1)
                          //this.status = myObj.description;
                          console.log(resp1);

                          if (myObj1.ResponseCode != "200") {
                          this.ismodelerror = true;
                          this.message = myObj1.message;
                          return;
                          }
                          else {
                            this.count = myObj1.count;
                            this.status2 = 'success';
                            this.isRegisterSuccess = true;
                          }
                          console.log(myObj.description);
                          console.log(status);
                      })
                      .catch(() => {
                        this.ismodelerror = true;
                          this.message='A Network Error Occurred.';
                      });         //
        }
    })
    .catch(() => {
        this.isfetching = false;
        this.status='A Network Error Occurred.';
    });
    //end request

   }
   //end check 2
      open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

      openDialog(): void {
        const dialogRef = this.dialog.open(ModalComponent, {
          width: '250px',
          data: {name: this.name, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
          this.animal = result;
        });
      }
}
