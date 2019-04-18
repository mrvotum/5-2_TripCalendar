/* eslint-disable no-mixed-operators */
/* eslint-disable no-else-return */
export default class Differents {
  // a - текущего месяца (не обязательно сегодня)
  // b - выбранное число
  constructor(a, b) {
    this.diffDay = a[0] - b[0];
    this.diffMonth = a[1] - b[1];
    this.diffYear = a[2] - b[2];
  }

  create() {
    // тот же день
    if (this.diffDay === 0 && this.diffMonth === 0 && this.diffYear === 0) {
      // console.log(`the same day     ${this.diffDay}   ${this.diffMonth}   ${this.diffYear}`);
      return 0;
    } else if (this.diffDay < 0 && this.diffMonth === 0 && this.diffYear === 0 || this.diffMonth < 0
      && this.diffYear === 0 || this.diffYear < 0) {
      return -1;
    } else { // следующий день/неделя/год
      return 1;
    }
  }
}
