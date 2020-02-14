import { Component, OnInit, Injectable, Input } from "@angular/core";
import { UserAuthenticationComponent } from '../auth/user-authentication.component';
import { Router } from "@angular/router";   
import * as AWS from "aws-sdk";  
import { Endpoint, AWSError } from 'aws-sdk'; 
import * as aws from "aws-sdk/lib/signers/v4";
import * as  HttpStatus  from 'http-status-codes';
import { Response } from '@angular/http';
import * as https from 'https';
import { stringify } from 'querystring';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})

@Injectable()
export class DashboardComponent implements OnInit {
    
   
  constructor(private router: Router) {}

  ngOnInit() {};  
 

  

  generateInviteCode(deviceId: string) { 
    

 alert('calling userpoollogin');
 let userPoolLogin = loginUserToUserPool('speddibhotla@fluidra.com', 'w80GB%ce'); 
 alert("userpoollogin" +userPoolLogin); 
let idToken: string;
//let  idToken: string;
//let code = userPoolLogin.code;
//if (code == 'OK') {
// idToken = userPoolLogin.message.AuthenticationResult.IdToken;

 alert("userpoollogin" +JSON.stringify(userPoolLogin)); 
 alert("idtoken" +idToken);
//}
  //let loginResponse = loginUser('speddibhotla@fluidra.com', 'w80GB%ce','dev');
  //alert("loginResponse " +loginResponse);


    AWS.config.update({
      region: "us-west-2", 
      credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "us-west-2:76fa3f59-1088-4529-a9ec-f052cab9a2c1"
      })
    });
   
    alert("inside generate invite code function");
    
    //Create an HttpRequest representation of your request (this wont actually _DO_ the request)
    let httpRequest = new AWS.HttpRequest(new Endpoint("https://dev.zodiac-io.com/invitecodes/v1/generate"), "us-west-2");
    
    //Host & content type headers must be set
    httpRequest.headers.host = "zewim57k06.execute-api.us-west-2.amazonaws.com";  
    httpRequest.headers['Content-Type'] = "application/json";
    httpRequest.headers['Authorization'] = "4d97s3h65r2799ubcc8ib1gk62"; 
    httpRequest.method = "POST";   
    httpRequest.body = JSON.stringify({deviceId: 'deviceId',userId: '1234'});  
    
     alert(httpRequest);
     alert(httpRequest.headers);
     alert(httpRequest.method);
     alert(httpRequest.endpoint.href);
     alert(httpRequest.body);
     

    //Instruct cognito credentials to get access, secret and session keys  
    (AWS.config.credentials as AWS.Credentials).get(function(err: AWSError){
      alert("inside function get");
      if(err) {
        alert(err.message)
      }
      else {
      //Sign the request with the newly fetched credentials. All IAM Authorised API Gateway requests use the V4 signer
      alert("inside else conditoin");
      let v4signer = new aws.signers(httpRequest, "execute-api", true);
      alert(v4signer);
     
      alert("calling authorizaiotn conditoin" );
      alert("credentials " +AWS.config.credentials);
      v4signer.addAuthorization(AWS.config.credentials, aws.util.date.getDate());
      alert("called authorizaiotn conditoin");
      return this.http.post(v4signer);
       
      console.log(httpRequest.headers)  
      alert(httpRequest.headers);
      console.log(httpRequest.method)  
      alert(httpRequest.method);
       console.log(httpRequest.endpoint.href)  
       alert(httpRequest.endpoint.href)
      console.log(httpRequest.body)
      alert(httpRequest.body);
      
      alert(err);
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
  return new Promise (function (resolve, reject) {  
     let result = {statusCode: 0, 
                   message: ""   ,
                   code: "",
                   error: "" };

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
          cognitoidentityserviceprovider.adminInitiateAuth(params, function(error, data) {
            alert('inside admin');
              if (error) {
                  if ((error.code == 'UserNotFoundException') || (error.code == 'NotAuthorizedException')) {
                    alert('inside admin error');
                      result.statusCode = error.statusCode;
                      result.message =  error.message;
                      result.code = error.code;
                      result.error = JSON.stringify(error);
                      resolve (result);
                  } else {
                      result.statusCode = error.statusCode;
                      result.message = error.message;
                      result.code = error.code;
                      result.error = JSON.stringify(error);
                      reject (data);
                  }
              } else {
                  alert('inside admin error');
                  result.statusCode = HttpStatus.OK;
                  result.message = JSON.stringify(data);
                  result.code = 'OK';
                  resolve (result);
                  alert(data);
              }
          });
      } catch (error) {
          result.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          result.message = error.message;
          result.code = 'UNKNOWN';
          result.error = error;
          reject (result);
      }
  });
}
 


  }
} 