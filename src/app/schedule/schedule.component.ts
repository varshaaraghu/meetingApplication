import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Schedule } from '../model/schedule';
import * as moment from 'moment';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  scheduleForm!: FormGroup;
  title = 'datetimepicker';
  constructor(private fb: FormBuilder, private scheduleService: ScheduleService) {
    this.scheduleForm = this.fb.group({
      id: new FormControl(''),
      clientName: new FormControl('', [Validators.required]),
      meetingAgenda: new FormControl('', [Validators.required]),
      attendees: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(2)]),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
    }, { validator: this.checkDates });
  }

  checkDates(group: FormGroup) {

    if (moment(group.controls['startTime'].value).format('YYYY-MM-DD HH:mm:ss') <
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss')) {
      group.controls['startTime'].setErrors({ 'startDateLessThanToday': true })
      //return { startDateLessThanToday:true }
    }

    if (moment(group.controls['endTime'].value).format('YYYY-MM-DD HH:mm:ss') <
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss')) {
      group.controls['endTime'].setErrors({ 'endDateLessThanToday': true })
    }
    if (group.controls['startTime'].value > group.controls['endTime'].value) {
      group.controls['endTime'].setErrors({ 'endDateLessThanStartDate': true })
    }
  }



  onSchedule() {
    let schedule = this.scheduleForm.value;

    let tempStartTime = moment(schedule.startTime).format('YYYY-MM-DD HH:mm:ss');
    let tempEndTime = moment(schedule.endTime).format('YYYY-MM-DD HH:mm:ss');
    schedule.id = (Math.random() * 10).toFixed();
    schedule.startTime = tempStartTime;
    schedule.endTime = tempEndTime;
    console.log(schedule);
    this.scheduleService.scheduleMeeting(schedule).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error)
      },
      complete: () => {
        console.log("Meeting Scheduled...");
        alert("Meeting Scheduled");
      }
    })
  }

  ngOnInit() {
   this.scheduleForm.reset();
  }
}


