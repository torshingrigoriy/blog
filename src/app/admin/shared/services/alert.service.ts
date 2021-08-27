import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {isPackageNameSafeForAnalytics} from "@angular/cli/models/analytics";

export type AlertType = 'success' | 'danger' | 'warning';

export interface Alert {
  type: AlertType,
  message: string
}
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert$: Subject<Alert> = new Subject<Alert>()
  constructor(
  ) {
  }

  success(message: string) {
    this.alert$.next({type: 'success', message: message})
  }
  warning(message: string) {
    this.alert$.next({type: 'warning', message: message})
  }
  danger(message: string) {
    this.alert$.next({type: 'danger', message: message})
  }
}
