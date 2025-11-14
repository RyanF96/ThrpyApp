export class TimerBase {
  public timer: any;
  public startDate = 0;
  public endDate = 0;
  public hours = 0;
  public minutes = 0;
  public seconds = 0;
  state: number | undefined;
  formattedTime: string | undefined;
  timerStarted = false;
  elapsedOnStop: number | undefined;
  elapsedTime: number | undefined;

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
        this.calculateTime(this.startDate, currentTime);
      }
    }, 1000);
  }

  calculateTime(start: number, end: number) {
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

  manualTimeEntry() {
    this.endDate = Date.parse(this.endDate.toString());
    // Assuming startDate is already a Date object
    this.startDate = !isNaN(Date.parse(this.startDate.toString())) ? Date.parse(this.startDate.toString()) : this.startDate;

    this.calculateTime(this.startDate, this.endDate);
    this.state = 2;
  }
}
