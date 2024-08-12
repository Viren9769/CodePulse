import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/categorymodel';
import { environment } from '../../../../environments/environment.development';
import { UpdateCategoryRequest } from '../models/updateCategoryRequest.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private cookieservice: CookieService) { }

 getAllCategory(): Observable<Category[]> {
  return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
 }

 getById(id: string): Observable<Category>{
 return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`)
 }
 addCategory(model: AddCategoryRequest) : Observable<void>
 {
  return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories`, model);
 }
 updateCategory(id: string, updatecategoryRequest : UpdateCategoryRequest): Observable<Category>
 {
  return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`, updatecategoryRequest)
    }
 deleteCategory(id: string) :Observable<Category>
 {
  return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
 }

}
