import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { BlogImage } from './models/blog-image.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit{



private file? : File;
fileName: string = '';
title: string = '';
images$?: Observable<BlogImage[]>;

@ViewChild('form', {static: false}) imageUplaodForm?: NgForm;

constructor(private imageservices: ImageService){}


  ngOnInit(): void {
    
   this.getImages();
  }

  onFileUploadChange(event: Event): void  {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];

    }

    uploadImage(): void {
      if(this.file && this.fileName !== '' && this.title !== '')
        {
          // image service to upload the image
          this.imageservices.uploadImage(this.file, this.fileName, this.title).subscribe({
            next: (Response) => {
             this.imageUplaodForm?.resetForm();
              this.getImages();
            }
          });
        }
      }

      selectImage(image: BlogImage) : void {
        this.imageservices.selectImage(image);
        }
        


      private getImages()
      {
        this.images$ = this.imageservices.getAllImages();
      }

}
