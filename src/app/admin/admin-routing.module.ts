import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";
import {AuthGuard} from "./shared/services/auth.guard";

const routes: Routes  = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {
        path: '', redirectTo: 'admin/login', pathMatch: 'full'
      }
      ,
      {
        path: 'login', component: LoginPageComponent
      }
      ,
      {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
      }
      ,
      {
        path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]
      }
      ,
      {
        path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
