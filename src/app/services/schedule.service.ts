import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})


export class ScheduleService {

  constructor(public http:HttpClient) { }

  scheduleMeeting(schedule:any):Observable<any>{
    return this.http.post("http://localhost:3000/scheduledMeetings",schedule);
  }
}
