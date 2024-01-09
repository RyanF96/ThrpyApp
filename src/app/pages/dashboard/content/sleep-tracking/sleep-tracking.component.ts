import { ChangeDetectorRef, Component } from '@angular/core';
import { ISleep, ISleepDetails } from 'src/app/data/contracts';
import { SettingsEnum } from 'src/app/data/enums';
import { DataService } from 'src/app/services/data.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-sleep-tracking',
  templateUrl: './sleep-tracking.component.html',
  styleUrls: ['./sleep-tracking.component.scss']
})
export class SleepTrackingComponent {
  private timer: any;
  public startDate: number = 0;
  public endDate: number = 0;
  public hours = 0;
  public minutes = 0;
  public seconds = 0;
  state: number | undefined;
  formattedTime: string | undefined;
  timerStarted = false;
  elapsedOnStop: number | undefined;
  elapsedTime: number | undefined;

  constructor(private dataService: DataService,private settingsService : SettingsService) { }

  checkTimer(state: number) {
    this.state = state;
    if (!this.timerStarted) {
      this.timerStarted = true;
      this.startTimer();
    }
    if (state === 2) {
      this.elapsedOnStop = this.elapsedTime ?? 0;
      this.endDate = Date.now();
    }
  }

  startTimer() {
    this.startDate = Date.now();
    this.timer = setInterval(() => {
      const currentTime = Date.now();
      if (this.state === 1) {
        this.calculateTime(this.startDate,currentTime);
      }
    }, 1000);
  }

  manualTimeEntry(){    
    this.endDate = Date.parse(this.endDate.toString());
    this.startDate = Date.parse(this.startDate.toString());
    this.calculateTime(this.startDate,this.endDate);
    this.state = 2;
  }

  calculateTime(start:number,end:number){
    this.elapsedTime = end - start;
    this.seconds = Math.floor((this.elapsedTime / 1000) % 60);
    this.minutes = Math.floor((this.elapsedTime / 1000 / 60) % 60);
    this.hours = Math.floor(this.elapsedTime / 1000 / 3600);
    this.formatTime();
  }

  formatTime() {
    const formattedHours = this.padZero(this.hours);
    const formattedMinutes = this.padZero(this.minutes);
    const formattedSeconds = this.padZero(this.seconds);
    this.formattedTime = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
  }


  padZero(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }

  reset() {
    clearInterval(this.timer);
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.state = 0;
    this.timerStarted = false;
    this.elapsedTime = 0;
    this.startDate = 0;
    this.endDate = 0;
  }

  saveSleep() {
    const sleep = {
      childId: this.settingsService.settings.find(x => x.key === SettingsEnum.SelectedChild)?.value,
      duration: this.elapsedTime, 
      startDate: new Date(this.startDate),
      endDate: new Date(this.endDate),
      details: {
        start: 'test',
        end:'test',
        how:'test',
      } as ISleepDetails
    } as ISleep
    this.dataService.saveSleep(sleep).subscribe((res) => {
      if (res) {
        this.reset();
      }
    })
  }
}
