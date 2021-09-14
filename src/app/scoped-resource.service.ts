import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScopedResourceService {
  constructor() {}

  public readPhrase(key: string, lang: string, sub$: Subject<string>) {
    setTimeout(() => {
      const t = `Text:${lang}:${key}`;      
      sub$.next(t);
    });
  }
}
