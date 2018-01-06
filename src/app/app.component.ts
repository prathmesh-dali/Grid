import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data= [];
  constructor() {
    for (let i = 0; i < 6400; i++) {
      this.data.push({
        Action: i % 3 ? 'Remove' : 'Add',
        ChangeTrackingId: '28549' + i,
        EffectiveDate: '9/' + (i % 10 + 1) + '/2017 12:00:00 AM',
        EndDate: '9/' + (i % 10 + 1) + '/9999 12:00:00 AM',
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
        ValidationStatus: i % 3 ? 'Failed' : 'Passed',
        Value: null,
        comment: null,
        _id: '3435345u230532fsfs9u504' + i
      });
    }
  }
}
