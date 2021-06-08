import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataModel } from 'src/app/data-model';

@Component({
  selector: 'app-subject-child',
  templateUrl: './subject-child.component.html',
  styleUrls: ['./subject-child.component.scss']
})
export class SubjectChildComponent implements OnInit {

  @Input() subject: Subject<DataModel>;
  @Input() name: string;


  public log: string[] = [];
  public connected: boolean = false;
  private subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  logData(data: DataModel) {
    this.log.push("Timestamp: " + data.timestamp + " Data: " + data.data);
  }
  connect() {
    this.log.push;
    this.connected = true;
    this.subscription = this.subject.subscribe(
      (data: DataModel) => {
        this.logData(data);
      },
      (error: Error) => {
        this.connected = false;
      },
      () => { this.connected = false; this.log.push('Finished') }
    );
  }
  disconnect() {

  }

}
