import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent, FormsModule, DatePipe,MarkdownModule]
})
export class AppComponent {
  title = 'CodePulse';
}
