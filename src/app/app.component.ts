import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, combineLatest, forkJoin, fromEvent, interval, merge, of, ReplaySubject, Subject, timer } from 'rxjs';
import { concatMap, mergeMap, switchMap, take } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {

    /* 
    ==============================
    Combination Operators
    ==============================

    The combination operators allow the joining of information from multiple observables.
    Order, time, and structure of emitted values is the primary variation among these operators.

    */

    /*
      ---------------
      combineLatest()
      ---------------
      What? 
      When any observable emits a value, 
      emit the last emitted value from each. (combines the value)

      When? 
      This operator is best used when you have multiple, 
      long-lived observables that rely on each other for some 
      calculation or determination.
    */

    // this.combineLatestExample();

    /*
      ---------------
      merge()
      ---------------
      What? 
      Turn multiple observables into a single observable

      When? 
      Use when order and validity of data of merged observables
      are not connected and don't rely on eachother, however
      it saves the order of the combined observables for ex.
      o1$,o2$,o3$ = > o1$,o2$,o3$, if order is not a priority, 
      `concat()` is always an option
    */

    // this.mergeExample();

    /*
      ---------------
      forkJoin()
      ---------------
      What? 
      When all observables complete, emit the last emitted value from each.

      When? 
      This operator is best used when you have a group of observables
      and only care about the final emitted value of each. 
      For example when sending multiple requests to BE
      and you need the received information from all requests.
    */

    // this.forkJoinExample();


    /* 
    ==============================
    Higher-Order Mapping Operators
    ==============================

    *Automatically subscribe to the inner Observable*
    *Flattens the resulting Observable*
    *Automatically unsubscribes from the inner observable*

    */

    /*
      ---------------
      switchMap()
      ---------------
      What? 
      The switchMap operator maps each value to an observable, 
      then it flattens all of the inner observables. 
      It basically projects each source value to an observable 
      which is then merged in the output observable, emitting 
      values only from the most recently projected observable.

      The main difference between switchMap and other 
      flattening operators is the cancelling effect.

      When? 
      This works perfectly for scenarios like typeaheads
      where you are no longer concerned with the response
      of the previous request when a new input arrives.

      !We use it very often working with store effects!

      Note!
      Only one inner subscription is active at a time.
    */

    // this.switchMapExample()

    /*
      ---------------
      concatMap()
      ---------------
      What? 
      Map values to inner observable, 
      subscribe and emit in order.
      
      When? 
      When you want to use a sequenced observables as
      the concatMap does not subscribe to the next observable
      until the prvious one is completed.
  
      Note! 
      The difference between concatMap and mergeMap is
      that concatMap does not subscribe to the next 
      observable until the previous completes
    */

    // this.concatMapExample();

    /*
      ---------------
      mergeMap()
      ---------------
      What? 
      Map to observable, emit values.
      
      When? 
      This operator is best used when you wish to flatten an inner observable 
      but want to manually control the number of inner subscriptions.
  
      Notes! 
      The difference between mergeMap and map is that the map operators
      emit value as observable. The MergeMap creates an inner observable,
      subscribes to it, and emits its value as observable.
  
      MergeMap never cancels any of its inner observable 
      it waits for them to finish and emit value.
  
      If only one inner subscription should be active at a time, use *switchMap*
  
      If the order of emission and subscription of 
      inner observables is important, use *concatMap*
    */

    // this.mergeMapExample();

    /* 
    ==============================
    Subjects
    ==============================

    A Subject is a special type of Observable which shares a single execution path among observers.
    You can think of this as a single speaker talking at a microphone in a room full of people.
    Their message (the subject) is being delivered to many (multicast) people (the observers) at once.
    */

    /*
      ---------------
      Subject
      ---------------
      What? 
      A special type of Observable which shares a single execution path among observers
      They will only pass the value to the subscribers that are
      active when the subject emits a new value.
      Does not require initial value.
      
      When? 
      When you need identical information passed down to different components.
    */

    // this.subjectExample();

    /*
      ---------------
      BehaviorSubjects
      ---------------
      What? 
      Requires an initial value and emits the current value to new subscribers.
      Will cache the last emitted value ( default value if no emits have occurred )
      if subscribed to, will recive the last emitted value.

      When? 
      When you need the last emitted value regardless of the time of subscribtion.

      Note!
      If you want the last emitted value(s) on subscription, 
      but do not need to supply a seed value, use ReplaySubject instead.

    */

    // this.behaviorSubjectExample();

    /*
      ---------------
      ReplaySubjects
      ---------------
      What? 
      "Replays" or emits old values to new subscribers

      When? 
      When you subscribe to it, it will return all previous emitts and listen for new ones.

    */

    // this.replaySubjectExample();

    /*
      ---------------
      AsyncSubject
      ---------------
      What? 
      Emits its last value on completion


    */

    // this.asyncSubjectExample();








    //                                      _____    _                       _                                   
    //                                     |_   _| | |__     __ _   _ __   | | __  ___                          
    //                                       | |   | '_ \   / _` | | '_ \  | |/ / / __|                         
    //                                       | |   | | | | | (_| | | | | | |   <  \__ \                         
    //                                       |_|   |_| |_|  \__,_| |_| |_| |_|\_\ |___/                                                                             
    //                                                                  __                                       
    //                                                                / _|   ___    _ __                        
    //                                                               | |_   / _ \  | '__|                       
    //                                                               |  _| | (_) | | |                          
    //                                                               |_|    \___/  |_|                                                                       
    //                                                               _            _       _                   _ 
    //                                           __      __   __ _  | |_    ___  | |__   (_)  _ __     __ _  | |
    //                                           \ \ /\ / /  / _` | | __|  / __| | '_ \  | | | '_ \   / _` | | |
    //                                            \ V  V /  | (_| | | |_  | (__  | | | | | | | | | | | (_| | |_|
    //                                             \_/\_/    \__,_|  \__|  \___| |_| |_| |_| |_| |_|  \__, | (_)
    //                                                                                                |___/     











  }

  private combineLatestExample() {
    // timerOne emits first value at 1s, then once every 4s
    const timerOne$ = timer(1000, 4000);
    // timerTwo emits first value at 2s, then once every 4s
    const timerTwo$ = timer(2000, 4000);
    // timerThree emits first value at 3s, then once every 4s
    const timerThree$ = timer(3000, 4000);

    // when one timer emits, emit the latest values from each timer as an array
    combineLatest([timerOne$, timerTwo$, timerThree$])
      .subscribe(
        ([timerValOne, timerValTwo, timerValThree]) => {
          /*
        Example:
        timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
        timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
        timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
         */
          console.log(
            `Timer One Latest: ${timerValOne}, Timer Two Latest: ${timerValTwo}, Timer Three Latest: ${timerValThree}`
          );
        }
      );
  }






  private mergeExample() {
    //emit every 2.5 seconds
    const first = interval(2500);
    //emit every 1 second
    const second = interval(1000);
    //used as instance method
    const example = merge(
      first,
      second
    )
    //output: 0,1,0,2....
    example.subscribe(val => console.log(val));
  }






  private forkJoinExample() {
    /*
  when all observables complete, provide the last
  emitted value from each as dictionary
  */
    forkJoin(
      {
        google: ajax.getJSON('https://api.github.com/users/google'),
        microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
        users: ajax.getJSON('https://api.github.com/users')
      }
    )
      // { google: object, microsoft: object, users: array }
      .subscribe(console.log);
  }






  private switchMapExample() {
    // subscribe for click events, observable 1
    fromEvent(document, 'click')
      .pipe(
        // observable 2(1s interval), emits value unitl observable 1 emits event
        switchMap(() => interval(1000))
      )
      // reset on first observable emit
      .subscribe(console.log);
  }






  private concatMapExample() {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(
      concatMap((ev) => {
        console.log('new observable');
        return interval(1000).pipe(take(4))
      })
    );
    result.subscribe(x => console.log(x));
    // For every click on the "document" it will emit values 0 to 3 spaced
    // on a 1000ms interval
    // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
  }






  private mergeMapExample() {
    let srcObservable = of(1, 2, 3, 4)
    let innerObservable = of('A', 'B', 'C', 'D')

    srcObservable.pipe(
      mergeMap(val => {
        console.log('Source value ' + val)
        console.log('starting new observable')
        return innerObservable
      })
    )
      .subscribe(ret => {
        console.log('Recd ' + ret);
      })
  }






  private subjectExample() {
    const subject = new Subject();

    subject.next(1);
    subject.subscribe(x => {
      console.log('Subscriber A', x);
    });
    subject.next(2); // OUTPUT => Subscriber A 2
    subject.subscribe(x => {
      console.log('Subscriber B', x);
    });
    subject.next(3); // OUTPUT => Subscriber A 3, Subscriber B 3 (logged from both subscribers)
  }






  private behaviorSubjectExample() {
    const subject = new BehaviorSubject(123);

    // two new subscribers will get initial value => output: 123, 123
    subject.subscribe(console.log);
    subject.subscribe(console.log);

    // two subscribers will get new value => output: 456, 456
    subject.next(456);

    // new subscriber will get latest value (456) => output: 456
    subject.subscribe(console.log);

    // all three subscribers will get new value => output: 789, 789, 789
    subject.next(789);

  }






  private replaySubjectExample() {
    const subject = new ReplaySubject(3);

    subject.next(1);
    subject.next(2);
    subject.subscribe(console.log); // OUTPUT => 1,2
    subject.next(3); // OUTPUT => 3
    subject.next(4); // OUTPUT => 4
    subject.subscribe(console.log); // OUTPUT => 2,3,4 (log of last 3 values from new subscriber)
    subject.next(5); // OUTPUT => 5,5 (log from both subscribers)
  }






  private asyncSubjectExample() {
    const sub = new AsyncSubject();

    sub.subscribe(console.log);

    sub.next(123); //nothing logged

    sub.subscribe(console.log);

    sub.next(456); //nothing logged
    sub.complete(); //456, 456 logged by both subscribers
  }

}