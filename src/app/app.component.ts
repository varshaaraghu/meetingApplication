import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meetingApplication';
  
  withoutRootComponents:boolean;

public constructor(private activatedRoute:ActivatedRoute) {
    this.withoutRootComponents = activatedRoute.snapshot.data['showRootComponents'];
}
}
