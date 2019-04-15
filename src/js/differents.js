export default function differents(a, b){
  console.log(`перв: ${a}`);
  console.log(`втор: ${b}`);

  // a - текущего месяца (не обязательно сегодня)
  // b - выбранное число
  const diffDay = a[0] - b[0];
  const diffMonth = a[1] - b[1];
  const diffYear = a[2] - b[2];
  // console.log(`месяц выбранный: ${a} --- месяц выбранный: ${b}`);
  if (diffDay === 0 && diffMonth === 0 && diffYear === 0) {
    console.log(`the same day     ${diffDay}   ${diffMonth}   ${diffYear}`);
    return 0;
  } else if (diffDay < 0 && diffMonth === 0 && diffYear === 0 || diffMonth < 0 && diffYear === 0 || diffYear < 0) {
    console.log(`last = noActive     ${diffDay}   ${diffMonth}   ${diffYear}`);
    return -1;
  } else {
    console.log(`next day/week/year     ${diffDay}   ${diffMonth}   ${diffYear}`);
    return 1;
  }
}