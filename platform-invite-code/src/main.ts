import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'; 

//Amplify.configure(awsconfig); 

//Amplify.configure({
 // Auth: {
  //  identityPoolId:'b93897a6-b9d7-45d3-a684-9131b12eb849',
  //  identityPoolRegion:'us-west-2',
   // region: 'us-west-2',
   // userPoolId: 'us-west-2_cQBnJ2oo6',
   // userPoolWebClientId: '61vjcq4e0ihiphibpekhr6cu14', 
   // userPoolWebClientSecret:'19actgilihjmcpt09ncn3fdqkaiu2djs5oq8gl3o06m7ehtk2v9k',
   // mandatorySignIn: true,
 // } 
//});

Amplify.configure({
  Auth: {
    identityPoolId:'76fa3f59-1088-4529-a9ec-f052cab9a2c1',
    identityPoolRegion:'us-west-2',
    region: 'us-west-2',
    userPoolId: 'us-west-2_rh1Ia1jf4',
    userPoolWebClientId: '2jieblnjs6pm3ak7f0umrbpsch',
    mandatorySignIn: true,
  } 
});



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
