import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-hot-observables-intro',
  templateUrl: './hot-observables-intro.component.html',
  styleUrls: ['./hot-observables-intro.component.scss']
})
export class HotObservablesIntroComponent implements OnInit {
  @ViewChild('myButton') private button: ElementRef;
  n1 = 0;
  n2 = 0;
  s1: string = '';
  s2: string = '';
  constructor() { }

  ngOnInit(): void {
    //hot observable unica base de eventos
    let myBtnClickObservable: Observable<any> = fromEvent(
      this.button.nativeElement, 'click'
    );
    myBtnClickObservable.subscribe((event) => console.log('button clicked 1'));
    myBtnClickObservable.subscribe((event) => console.log('button clicked 2'));

    class Producer {
      private myListeners: any = [];
      private n = 0;
      private id: any;

      addListener(l: any) {
        this.myListeners.push(l);
      }
      start() {
        this.id = setInterval(() => {
          this.n++;
          console.log('From producer: ' + this.n)
          for (let l of this.myListeners)
            l(this.n); // vai avisar que o n esta sendo gerado
        }, 1000)
      }

      stop() {
        clearInterval(this.id);
      }
    }

    let producer: Producer = new Producer();
    producer.start();
    setTimeout(() => {
      producer.addListener((n) => console.log('From listener 1', n));
      producer.addListener((n) => console.log('From listener 2', n));

    }, 4000);

    const myHotObservable = new Observable(
      (observer: Observer<number>) => {
        producer.addListener((n) => observer.next(n))
      }
    )
    myHotObservable.subscribe((n) => console.log('From Subscribe 1', n))
    myHotObservable.subscribe((n) => console.log('From Subscribe 2', n))

  }
}
