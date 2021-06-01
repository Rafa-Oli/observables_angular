import { Component, OnInit } from '@angular/core';
import { ConnectableObservable, Observable, Observer, Subject } from 'rxjs';

import { publish, refCount } from 'rxjs/operators';
@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.scss']
})
export class HotObservablesComponent implements OnInit {
  n1 = 0;
  n2 = 0;
  s1: string = '';
  s2: string = '';


  myObservable: Observable<number>;

  constructor() { }

  ngOnInit(): void {
    this.myObservable = new Observable(
      (observer: Observer<number>) => {
        let i: number = 0;
        setInterval(() => {
          i++;
          (i == 100) ? observer.complete() : observer.next(i);
        }, 1000)
      }
    )
    // this.usingSubjects();
    this.usingPublish();
  }

  public usingPublish() {
    // const multicasted = this.myObservable.pipe(
    //   publish(), refCount()
    // );
    const multicasted: ConnectableObservable<number> = this.myObservable.pipe(
      publish()
    ) as ConnectableObservable<number>;
    multicasted.connect();
    //Subscribe 1
    this.s1 = 'waiting for interval...'
    setTimeout(() => {
      multicasted.subscribe((_n) => {
        this.n1 = _n;
        this.s1 = 'ok';
      })
    }, 2000)


    //Subscribe 2
    this.s2 = 'waiting for interval...'
    setTimeout(() => {
      multicasted.subscribe((_n) => {
        this.n2 = _n;
        this.s2 = 'ok';
      })
    }, 4000)
  }

  public usingSubjects() {

    const subject = new Subject<number>();
    this.myObservable.subscribe(subject);

    //Subscribe 1
    this.s1 = 'waiting for interval...'
    setTimeout(() => {
      subject.subscribe((_n) => {
        this.n1 = _n;
        this.s1 = 'ok';
      })
    }, 2000)


    //Subscribe 2
    this.s2 = 'waiting for interval...'
    setTimeout(() => {
      subject.subscribe((_n) => {
        this.n2 = _n;
        this.s2 = 'ok';
      })
    }, 4000)
  }

}