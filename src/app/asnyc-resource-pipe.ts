import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform
} from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { ScopedResourceService } from './scoped-resource.service';

export class AsyncResourcePipe<T> {
  protected readonly subject$: ReplaySubject<T>;
  protected latestValue: T;

  constructor(
    public readonly defaultValue: T,
    protected readonly cdref: ChangeDetectorRef
  ) {
    this.subject$ = new ReplaySubject<T>(1);
    this.latestValue = this.defaultValue;
    this.subject$.subscribe({
      next: value => {
        this.latestValue = value;
        this.cdref.markForCheck();
        // console.log('latest: ', this.latestValue);
      },
      complete: () => {
        //
      },
      error: e => console.error(`Error in resource pipe`, e)
    });
  }
}

@Pipe({
  name: 'asyncText',
  pure: false
})
export class AsyncTextPipe extends AsyncResourcePipe<string>
  implements PipeTransform, OnDestroy {
  private lastKey: string | undefined;
  constructor(
    private readonly resourceService: ScopedResourceService,
    cdref: ChangeDetectorRef
  ) {
    super(`...`, cdref);
  }

  public transform(resourceKey: string): string {
    if (resourceKey === this.lastKey) {
      return this.latestValue;
    }
    this.lastKey = resourceKey;
    this.resourceService.readPhrase(
      resourceKey,
      navigator.language,
      this.subject$
    );
    return this.latestValue;
  }

  public ngOnDestroy(): void {
    this.subject$.complete();
  }
}
