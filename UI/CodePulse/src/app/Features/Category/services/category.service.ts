// import { Injectable } from '@angular/core';
// import { AddCategoryRequest } from '../models/add-category-request-model';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Category } from '../models/categorymodel';
// import { environment } from '../../../../environments/environment.development';
// import { UpdateCategoryRequest } from '../models/updateCategoryRequest.model';
// import { CookieService } from 'ngx-cookie-service';
// import { catchError, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class CategoryService {

//   isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

//   constructor(private http: HttpClient, private cookieservice: CookieService) {}

//   // Get all categories
//   getAllCategory(): Observable<Category[]> {
//     return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`, {
//       headers: this.getAuthHeaders()
//     }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Get category by ID
//   getById(id: string): Observable<Category> {
//     return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`, {
//       headers: this.getAuthHeaders()
//     }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Add a new category
//   addCategory(model: AddCategoryRequest): Observable<void> {
//     return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories`, model, {
//       headers: this.getAuthHeaders()
//     }).pipe(
//       tap(() => this.isAuthentication.next(true)), // Set isAuthentication to true when category is successfully added
//       catchError(this.handleError)
//     );
//   }

//   // Update an existing category
//   updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest): Observable<Category> {
//     return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`, updateCategoryRequest, {
//       headers: this.getAuthHeaders()
//     }).pipe(
//       tap(() => this.isAuthentication.next(true)), // Set isAuthentication to true when category is successfully updated
//       catchError(this.handleError)
//     );
//   }

//   // Delete a category
//   deleteCategory(id: string): Observable<Category> {
//     return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`, {
//       headers: this.getAuthHeaders()
//     }).pipe(
//       tap(() => this.isAuthentication.next(true)), // Set isAuthentication to true when category is successfully deleted
//       catchError(this.handleError)
//     );
//   }

//   // Get token from cookie and set in headers
//   private getAuthHeaders(): HttpHeaders {
//     const token = this.cookieservice.get('authToken'); // Get JWT token from cookies
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`, // Set the token in Authorization header
//       'Content-Type': 'application/json'
//     });
//   }

//   // Handle HTTP errors
//   private handleError(error: any): Observable<never> {
//     console.error('An error occurred:', error);
//     return throwError(() => new Error('Something went wrong; please try again later.'));
//   }
// }


 import { Injectable } from '@angular/core';
 import { AddCategoryRequest } from '../models/add-category-request-model';
 import { BehaviorSubject, Observable } from 'rxjs';
 import { HttpClient } from '@angular/common/http';
 import { Category } from '../models/categorymodel';
 import { environment } from '../../../../environments/environment.development';
 import { UpdateCategoryRequest } from '../models/updateCategoryRequest.model';
 import { CookieService } from 'ngx-cookie-service';
 @Injectable({
   providedIn: 'root'
 })
export class CategoryService {
isAuthentication: BehaviorSubject<boolean> = new  BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private cookieservice: CookieService) { }

 getAllCategory(): Observable<Category[]> {
  return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
}

 getById(id: string): Observable<Category>{
 return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`)
 }
  addCategory(model: AddCategoryRequest) : Observable<void>
  {
 return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories`, model,{
  headers: {'Authorization': this.cookieservice.get('Authorization')}
  });
 }
 updateCategory(id: string, updatecategoryRequest : UpdateCategoryRequest): Observable<Category>
  {
  return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/${id}? `, updatecategoryRequest,{
    headers: {'Authorization': this.cookieservice.get('Authorization')}
  });
 }
 deleteCategory(id: string) :Observable<Category>
 {
   return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`,{
    headers: {'Authorization': this.cookieservice.get('Authorization')}
  });
 }

}

//,{
 // headers: {'Authorization': this.cookieservice.get('Authorization')}
 // }



// import { Injectable } from '@angular/core';
// import { AddCategoryRequest } from '../models/add-category-request-model';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { Category } from '../models/categorymodel';
// import { environment } from '../../../../environments/environment.development';
// import { UpdateCategoryRequest } from '../models/updateCategoryRequest.model';
// import { CookieService } from 'ngx-cookie-service';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class CategoryService {

//   isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

//   constructor(private http: HttpClient, private cookieservice: CookieService) { }

//   getAllCategory(): Observable<Category[]> {
//     return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
//   }

//   getById(id: string): Observable<Category> {
//     return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
//   }

//   addCategory(model: AddCategoryRequest): Observable<void> {
//     return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories`, model).pipe(
//       tap(() => {
//         this.isAuthentication.next(true); // Set isAuthentication to true when category is successfully added
//       })
//     );
//   }

//   updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest): Observable<Category> {
//     return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`, updateCategoryRequest).pipe(
//       tap(() => {
//         this.isAuthentication.next(true); // Set isAuthentication to true when category is successfully updated
//       })
//     );
//   }

//   deleteCategory(id: string): Observable<Category> {
//     return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`).pipe(
//       tap(() => {
//         this.isAuthentication.next(true); // Set isAuthentication to true when category is successfully deleted
//       })
//     );
//   }

//    // Get token from cookie
//    getToken(): string | null {
//     const token = this.cookieservice.get('authToken');
//     console.log('Token:', token); // Debugging - log the token
//     return token;
//   }
// }
