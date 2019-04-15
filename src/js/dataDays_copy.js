const date = new Date();

export default function makeCalendar(next, year, month) {
  const dayLast = new Date(year,month+1,0).getDate(),
    day = new Date(year,month,dayLast),
    dayWeeklast = new Date(day.getFullYear(), day.getMonth(), dayLast).getDay(),
    dayWeekFirst = new Date(day.getFullYear(), day.getMonth(), 1).getDay();
  var month=[
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];
  let calendar = '<tr>';

  if (dayWeekFirst != 0) {
    for(let  i = 1; i < dayWeekFirst; i++) calendar += '<td>';
  } else {
    for(let  i = 0; i < 6; i++) calendar += '<td>';
  }

  let today = false;
  for(let  i = 1; i <= dayLast; i++) {
    if (i == date.getDate() && day.getFullYear() == date.getFullYear() && day.getMonth() == date.getMonth()) {
      calendar += '<td class="today checkedDayThere">' + i;
      today = true;
    } else if (today || next === 'next') {
      calendar += '<td class = active>' + i;
    } else if (next === 'back') {
      calendar += '<td class = active>' + i;
    } else {
      calendar += '<td class="noActive">' + i;
    }
    if (new Date(day.getFullYear(),day.getMonth(),i).getDay() == 0) {
      calendar += '<tr>';
    }
  }
  //today = false;

  for(let  i = dayWeeklast; i < 7; i++) calendar += '<td>&nbsp;';
  document.querySelector('#calendar tbody').innerHTML = calendar;
  document.querySelector('#calendar thead td:nth-child(2)').innerHTML = month[day.getMonth()] +' '+ day.getFullYear();
  document.querySelector('#calendar thead td:nth-child(2)').dataset.date = 'date';
  document.querySelector('#calendar thead td:nth-child(2)').dataset.month = day.getMonth();
  document.querySelector('#calendar thead td:nth-child(2)').dataset.year = day.getFullYear();
  if (document.querySelectorAll('#calendar tbody tr').length < 6) {
    document.querySelector('#calendar tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
  }
}
