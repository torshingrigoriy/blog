import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private _router: Router,
    public _auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(event: MouseEvent) {
    event.preventDefault()
    this._auth.logout()
    this._router.navigate(['/admin', 'login'])
  }
}
