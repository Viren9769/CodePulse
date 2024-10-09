import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { Category } from '../models/categorymodel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/updateCategoryRequest.model';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnDestroy, OnInit {


 
id: string | null = null;
paramsSubscription?: Subscription;
editCategorySubscription?: Subscription;
category?: Category;

constructor(private route: ActivatedRoute, 
  private categoryservice: CategoryService,
  private router: Router
) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe(
      {
        next:(params) =>{
          this.id = params.get('id'); 

          if(this.id)
            // get the data from the API for this category ID

          this.categoryservice.getById(this.id).subscribe({
            next:(Response) => {
              this.category  = Response;
            }
          })
        }
      });
  }

  onFormsubmit(): void {
   const updateCategoryRequest: UpdateCategoryRequest = {
    name: this.category?.name ?? '',
    urlHandle: this.category?.urlHandle ?? '',
   };
   // pass the service
   if(this.id)
    {
   this.editCategorySubscription = this.categoryservice.updateCategory(this.id, updateCategoryRequest).subscribe({
        next:(Response) =>
          {
           this.router.navigateByUrl('/admin/categories');

          }
      })
    }
    }

    onDelete(): void {
      if(this.id){
        this.categoryservice.deleteCategory(this.id).subscribe({
          next: (Response) => {
            this.router.navigateByUrl('/admin/categories');
          }
        })
      }
      
      }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
 
}



// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { CategoryService } from '../services/category.service';
// import { Category } from '../models/categorymodel';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { UpdateCategoryRequest } from '../models/updateCategoryRequest.model';

// @Component({
//   selector: 'app-edit-category',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './edit-category.component.html',
//   styleUrls: ['./edit-category.component.css']
// })
// export class EditCategoryComponent implements OnDestroy, OnInit {

//   id: string | null = null;
//   paramsSubscription?: Subscription;
//   editCategorySubscription?: Subscription;
//   category?: Category;
//   errorMessage: string = '';

//   constructor(
//     private route: ActivatedRoute, 
//     private categoryService: CategoryService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.paramsSubscription = this.route.paramMap.subscribe({
//       next: (params) => {
//         this.id = params.get('id'); 

//         if (this.id) {
//           // Get the data for the category by ID from the API
//           this.categoryService.getById(this.id).subscribe({
//             next: (response) => {
//               this.category = response;
//             },
//             error: (error) => {
//               this.errorMessage = 'Failed to load category data. Please try again later.';
//               console.error('Error loading category:', error);
//             }
//           });
//         }
//       }
//     });
//   }

//   // On form submission to update category
//   onFormSubmit(): void {
//     if (this.category && this.id) {
//       const updateCategoryRequest: UpdateCategoryRequest = {
//         name: this.category.name ?? '',
//         urlHandle: this.category.urlHandle ?? ''
//       };

//       // Validate input before making the request
//       if (!updateCategoryRequest.name || !updateCategoryRequest.urlHandle) {
//         this.errorMessage = 'Both name and URL handle are required.';
//         return;
//       }

//       this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest).subscribe({
//         next: (response) => {
//           // Navigate back to the categories list page upon success
//           this.router.navigateByUrl('/admin/categories');
//         },
//         error: (error) => {
//           this.errorMessage = 'Failed to update category. Please try again later.';
//           console.error('Error updating category:', error);
//         }
//       });
//     }
//   }

//   // Delete the category
//   onDelete(): void {
//     if (this.id) {
//       this.categoryService.deleteCategory(this.id).subscribe({
//         next: (response) => {
//           // Navigate back to the categories list page after deletion
//           this.router.navigateByUrl('/admin/categories');
//         },
//         error: (error) => {
//           this.errorMessage = 'Failed to delete category. Please try again later.';
//           console.error('Error deleting category:', error);
//         }
//       });
//     }
//   }

//   ngOnDestroy(): void {
//     this.paramsSubscription?.unsubscribe();
//     this.editCategorySubscription?.unsubscribe();
//   }
// }
