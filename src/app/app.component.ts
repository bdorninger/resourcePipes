import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  other = 'FUBAK'
}
