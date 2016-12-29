import {Component, Input} from '@angular/core';
import {ITimer} from './itimer';


@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls:['./timer.component.css']
})
export class TimerComponent {

  @Input() timeInSeconds: number;
  public timer: ITimer;
  clockStartedFullTime:any;
  clockStartedHoursAndMinutes:any;


  public timerNoticeBoard:any = [
    {
      message:"Official Work timings 10 am to 7 pm"
    },
    {
      message:"Working days are Monday to Friday"
    },
    {
      message:"Lunch time maximum for an hour any time"
    }
  ]

  constructor(
  ) {
  }

  ngOnInit() {
    this.initTimer();
  }

  hasFinished() {
    return this.timer.hasFinished;
  }

  initTimer() {
    if(!this.timeInSeconds) { this.timeInSeconds = 0; }

    this.timer = <ITimer>{
      seconds: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsRemaining: this.timeInSeconds
    };

    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
  }

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
    this.clockStartedFullTime = new Date();
    this.clockStartedHoursAndMinutes = this.clockStartedFullTime.getHours() + ":" + this.clockStartedFullTime.getMinutes();

  }

  pauseTimer() {
    this.timer.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {
      if (!this.timer.runTimer) { return; }
      this.timer.secondsRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
      if (this.timer.secondsRemaining > 0) {
        this.timerTick();
      }
      else {
        this.timer.hasFinished = true;
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }
}
