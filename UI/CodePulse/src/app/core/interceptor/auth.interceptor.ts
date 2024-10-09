// import { HttpInterceptorFn } from '@angular/common/http';
// import { CookieService } from 'ngx-cookie-service';
// import { inject } from '@angular/core';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const myToken = inject(CookieService);
//   const token = myToken.get('token');
//   console.log(myToken);
// if(token)
// {
//   console.log('----------------------------------',myToken);
//     req = req.clone({
//  //headers: req.headers.set('Authorization',  `Bearer ${myToken}` )
//     setHeaders: {
//       'Authorization' : `Bearer ${myToken}`
//     }
//   });
// }else{
//     console.log('No token found');
// }
//   return next(req);
// }



// // import { HttpInterceptorFn } from '@angular/common/http';
// // import { inject } from '@angular/core';
// // import { UserServiceService } from '../Services/user-service.service';

// // export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

// // const userservice = inject(UserServiceService);
// // const myToken = userservice.getToken();


// // //console.log(myToken);
// // if(myToken)
// //   console.log('----------------------------------',myToken);
// //     req = req.clone({
// //  //headers: req.headers.set('Authorization',  `Bearer ${myToken}` )
// //     setHeaders: {
// //       'Authorization' : `Bearer ${myToken}`
// //     }
// //   });
// //   return next(req);

// // //return next(req);
// // };