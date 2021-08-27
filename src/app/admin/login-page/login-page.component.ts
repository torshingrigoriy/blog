import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  submitted: boolean = false
  message: string;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    public _auth: AuthService,
    private _route: ActivatedRoute,
    private _alertService: AlertService
  ) {
    this.form = _fb.group({
      email: _fb.control('', [
        Validators.required,
        Validators.email
      ]),
      password: _fb.control('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params: Params)=> {
      if(params['loginAgain']) {
        this.message = 'Пожалуйста, войдите в систему'
        this._alertService.warning('Пожалуйста, войдите в систему')
      }else if(params['authFailed']) {
        this.message = 'Сессия истекла, войдите снова'
        this._alertService.danger('Сессия истекла, войдите снова')
      }
    })
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this._auth.login(user).subscribe(
      () => {
        this.form.reset()
        this._router.navigate(['/admin', 'dashboard'])
      }, error => {
        this.submitted = false
      })
  }
}
