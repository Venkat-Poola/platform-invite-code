import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router'; 
import {  DataService } from '../service/dataservice';

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrls: ['./user-authentication.component.scss']
})

export class UserAuthenticationComponent implements OnInit {
    
  signstatus: string = 'signin' 
  user: string;  

  constructor( private route: Router) { } 

  ngOnInit() {
  }
 
  signInToAWS(email: HTMLInputElement, password: HTMLInputElement ) {

    

    alert(email.value + " " + password.value );
    
    const authInfo = {
      username: email.value,
      password: password.value
    }

    

    alert(authInfo);
    alert("calling signin function"); 

    Auth.signIn(authInfo).then( user => { 
      alert("sign in successful");
      alert(JSON.stringify(user));
      this.user = JSON.stringify(user);  
      this.route.navigate(['/dashboard'])
    })
    .catch(err => alert(err.message));
  

   // Auth.signIn(authInfo).then(user => {
  //    console.log(user);
   //   alert(user);
   //   this.route.navigate(['/dashboard'])
  //  })
    //  .catch(err => console.log(err));

  }  
}