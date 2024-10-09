// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
// import { AuthService } from '../services/auth.service';
// import {jwtDecode} from 'jwt-decode';

// export const authGuard: CanActivateFn = (route, state) => {
//   const cookieService = inject(CookieService);
//  const authservice = inject(AuthService);
//  const router = inject(Router);
//  const user = authservice.getUser();
//   // check for the jwt token
//   let token = cookieService.get('Authorization');
  
//   if(token && user){
//     token = token.replace('Bearer ', '');
//  const decodedtoken: any = jwtDecode(token);

//  // check if token is expire 
//  const expirationDate = decodedtoken.exp * 1000;
//  const currentTime = new Date().getTime();

//  if(expirationDate < currentTime)
//  {
//    // logout using authservice
//    authservice.logout();
//    return router.createUrlTree(['/login'], { queryParams : { returnUrl: state.url}})
//  }
//  else{
//   //toiken is still valid 
// if(user.roles.includes('Writer')){
//   return true;}
//   else{
//     alert('Unauthorized');
//     return false;
//   }
// }
//   }
 
//   else{
//     // logout using authservice
//     authservice.logout();
//     return router.createUrlTree(['/login'], { queryParams : { returnUrl: state.url}})
//   }
// };
// // 


import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authservice = inject(AuthService);
  const router = inject(Router);
  const user = authservice.getUser();
  
  // Check if user is logged in
  if (user) {
    // Check if the user has the 'Writer' role
   // if (user.roles.includes('Writer')) {
      return true;
//     } else {
//       alert('Unauthorized');
//       return false;
//     }
//   }
   } else {
    // If user is not logged in, redirect to login page
    authservice.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
};

