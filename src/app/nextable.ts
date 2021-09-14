import { Observable, Subject } from "rxjs";

export interface SubjectLike<T> extends Observable<T> {
  next(val: T):void;  
}

export function sendValue<T>(obs$: SubjectLike<T>, val:T) {
  obs$.next(val);
}

export function sendValueOverSubject<T>(sub$: Subject<T>, val:T) {
  sendValue(sub$,val);
}
