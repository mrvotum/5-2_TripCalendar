/* eslint-disable no-mixed-operators */
/* eslint-disable no-else-return */
export default function differents(a, b) {
  console.log(`перв: ${a}`);
  console.log(`втор: ${b}`);

  // a - текущего месяца (не обязательно сегодня)
  // b - выбранное число
  const diffDay = a[0] - b[0];
  const diffMonth = a[1] - b[1];
  const diffYear = a[2] - b[2];

  // тот же день
  if (diffDay === 0 && diffMonth === 0 && diffYear === 0) {
    console.log(`the same day     ${diffDay}   ${diffMonth}   ${diffYear}`);
    return 0;
  } else if (diffDay < 0 && diffMonth === 0 && diffYear === 0 || diffMonth < 0
    && diffYear === 0 || diffYear < 0) {
    return -1;
  } else { // следующий день/неделя/год
    return 1;
  }
}
