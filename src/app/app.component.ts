import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data= []
  constructor(){
    for (let i = 0; i < 64000; i++) {
      this.data.push({
        Action: 'Add',
        ChangeTrackingId: '285497',
        EffectiveDate: '9/13/2017 12:00:00 AM',
        EndDate: '9/13/9999 12:00:00 AM',
        FromIACode: 'test' + i % 10,
        FromIACodeFees: null,
        FromIACodeName: null,
        ID: null,
        OverrideIndicator: null,
        RecordStatus: null,
        Remarks: null,
        ToIACode: 'test' + i % 20,
        ToIACodeFees: null,
        ToIACodeName: null,
        ValidationStatus: 'Failed',
        Value: null,
        comment: null,
        _id: '3435345u230532fsfs9u504'+i
      });
    }
  }
}