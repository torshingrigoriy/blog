import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Alert, AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 2000
  type;
  message;
  aSub: Subscription;

  constructor(
    private _alertService: AlertService
  ) {
    this.aSub = this._alertService.alert$.subscribe((alert: Alert) => {
      this.type = alert.type
      this.message = alert.message
      setTimeout(() => {
        this.message = ''
      }, this.delay)
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    if(this.aSub) {
      this.aSub.unsubscribe()
    }
  }


}
