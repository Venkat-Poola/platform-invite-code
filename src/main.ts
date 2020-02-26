import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from 'aws-amplify';

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
    identityPoolId:'1edad152-a05b-4e63-9b4e-6285b0232ae7',
    identityPoolRegion:'us-east-1',
    region: 'us-east-1',
    userPoolId: 'us-east-1_JnqMaTFMU',
    userPoolWebClientId: '2k9trfr76q7p9i224uf31i9i4j',
    mandatorySignIn: true,
  } 
});



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
