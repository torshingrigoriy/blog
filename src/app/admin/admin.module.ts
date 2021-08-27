import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AuthService} from "./shared/services/auth.service";
import {AuthGuard} from "./shared/services/auth.guard";
import {SearchPipe} from "./shared/pipes";
import { AlertComponent } from './shared/components/alert/alert.component';

@NgModule({
    imports: [
      CommonModule,
      AdminRoutingModule,
      ReactiveFormsModule,
      SharedModule,
      FormsModule,
    ],
    declarations: [
      AdminLayoutComponent,
      LoginPageComponent,
      DashboardComponent,
      CreatePageComponent,
      EditPageComponent,
      SearchPipe,
      AlertComponent,
    ],
    providers: [
      AuthGuard
    ]
  }
)
export class AdminModule {
}
