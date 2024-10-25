import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { PublicRouterModule } from "./public-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    PublicRouterModule,
    ReactiveFormsModule,
    // angular matrial modules
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,

  ]
})
export class PublicModule { }
