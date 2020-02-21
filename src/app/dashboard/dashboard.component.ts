import { Component, OnInit, Injectable, Input, ɵPlayState } from "@angular/core";
import { UserAuthenticationComponent } from '../auth/user-authentication.component';
import { Router } from "@angular/router";
import * as AWS from "aws-sdk";
import { Endpoint, AWSError } from 'aws-sdk';
import * as aws from "aws-sdk/lib/signers/v4";
import * as  HttpStatus from 'http-status-codes';
import { Response, Headers, Http } from '@angular/http';
import * as https from 'https';
import { stringify } from 'querystring';
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs/Observable";
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})

@Injectable()
export class DashboardComponent implements OnInit {

  
  inviteCodeString :string;
  inviteCodeImage :string;
  errorInputField:string;

  constructor(private router: Router,
    private http: HttpClient) { }

  ngOnInit() { };


  

  generateInviteCode(deviceId: HTMLInputElement) {

   let inviteCodes = [];
   let tempData =[];

    let userPoolLogin = loginUserToUserPool('speddibhotla@fluidra.com', 'w80GB%ce');
    console.log("userpoollogin" + userPoolLogin);
    let idToken: string;

    console.log("userpoollogin...." + JSON.stringify(userPoolLogin));
    
    

    
    AWS.config.update({
      region: "us-west-2",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "us-west-2:76fa3f59-1088-4529-a9ec-f052cab9a2c1"
      })
    });


    this.http.post('https://zewim57k06.execute-api.us-west-2.amazonaws.com/dev/v1/generate', { deviceId: deviceId.value, userId: 169378 }).subscribe({
      next: data => { inviteCodes.push(data),
        tempData.push(inviteCodes.pop()),
        this.inviteCodeImage =tempData[0].qrcode,
        this.inviteCodeString =tempData[0].inviteCode,
        this.errorInputField="";
      console.log("Poped out data from array",tempData)
      },
      error: error => {this.errorInputField="** Unable to generate invite code,Please check entered Device Id/Serial No  **",
      console.error('Error in fetching the Invite Code!', error)
    }
    });
  
    /**
* _loginUserToUserPool
* --------------------
* Login to the Cognito User Pool using the user's email and password
*
* @param {string} email the email address for the user
* @param {string} password the password for the user
* @return the user pool login object
*/
    function loginUserToUserPool(email, password) {
      return new Promise(function (resolve, reject) {
        let result = {
          statusCode: 0,
          message: "",
          code: "",
          error: ""
        };

        try {
          const params = {
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            ClientId: '4d97s3h65r2799ubcc8ib1gk62',
            UserPoolId: 'zodiac - grihDcgd7',
            AuthParameters: {
              USERNAME: 'speddibhotla@fluidra.com',
              PASSWORD: 'PSmani8989!'
            }
          };
          const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
            apiVersion: '2016-04-18',
            region: 'us-west-2'
          });
          cognitoidentityserviceprovider.adminInitiateAuth(params, function (error, data) {
            console.log('inside admin');
            if (error) {
              if ((error.code == 'UserNotFoundException') || (error.code == 'NotAuthorizedException')) {
                console.log('inside admin error');
                result.statusCode = error.statusCode;
                result.message = error.message;
                result.code = error.code;
                result.error = JSON.stringify(error);
                resolve(result);
              } else {
                result.statusCode = error.statusCode;
                result.message = error.message;
                result.code = error.code;
                result.error = JSON.stringify(error);
                reject(data);
              }
            } else {
              console.log('inside admin error');
              result.statusCode = HttpStatus.OK;
              result.message = JSON.stringify(data);
              result.code = 'OK';
              resolve(result);
              alert(data);
            }
          });
        } catch (error) {
          result.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          result.message = error.message;
          result.code = 'UNKNOWN';
          result.error = error;
          reject(result);
        }
      });
    }

  }



  logOut() {
    this.router.navigate(['/auth'])
  }

 

} 