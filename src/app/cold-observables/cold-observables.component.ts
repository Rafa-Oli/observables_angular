import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.scss']
})
export class ColdObservablesComponent implements OnInit {
  subscription1: Subscription;
  subscription2: Subscription;

  n1 = 0;
  n2 = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  public ngOnInit(): void {
    this.s1 = 'Inicializing'
    this.s2 = 'Inicializing'

    const myIntervalObservable = new Observable(
      (observer: Observer<any>) => {
        let i: number = 0;
        let id = setInterval(() => {
          i++;
          console.log('from observable: ', i)
          if (i == 10)
            observer.complete();
          else if (i % 2 == 0)
            observer.next(i);

        }, 1000);
        return () => {
          clearInterval(id); //limpando o interval para finalizar, senão vai continuar sem parar
        }
      }
    );
    this.s1 = 'waiting for interval...'
    this.subscription1 = myIntervalObservable.subscribe(
      (_n) => { this.n1 = _n },
      (error) => { this.s1 = 'Error: ' + error },
      () => { this.s1 = 'Completed' }
    );

    this.s2 = 'waiting for interval...'
    setInterval(() => {
      this.subscription2 = myIntervalObservable.subscribe(
        (_n) => { this.n2 = _n },
        (error) => { this.s2 = 'Error: ' + error },
        () => { this.s2 = 'Complete' }
      );
    }, 3000)

    setTimeout(() => {
      this.subscription1.unsubscribe;
      this.subscription2.unsubscribe;
    }, 11000)
  }
}
