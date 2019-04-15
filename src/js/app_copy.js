import makeCalendar from './dataDays';

// const form = document.querySelector('[data-form=form]');
const toThere = document.querySelector('[data-input=toThere]');
// const toBack = document.querySelector('[data-input=toBack]');
const calendar = document.querySelector('#calendar');
// const calendarToBack = document.querySelector('#calendarToBack');

// const checkbox = document.getElementById('checkbox');
// // let checkboxCheck = false;

// const date = new Date();

checkbox.addEventListener('change', (event) => {
  if (checkbox.checked){
    document.getElementsByClassName('back')[0].style.display = 'block';
  } else {
    document.getElementsByClassName('back')[0].style.display = 'none';
  }
});


calendar.addEventListener('click', (event) => {
  if (event.toElement.tagName === 'TD' && event.toElement.className === 'active' || event.toElement.tagName === 'TD' && event.toElement.className === 'today'){

    try {
      const dayToThere = calendar.getElementsByClassName('checkedDayThere');
      if (dayToThere[0].className === 'today checkedDayThere'){
        dayToThere[0].className = 'today';
      } else {
        dayToThere[0].className = 'active';
      }
    } catch (error) {
      console.log('ошибочка');      
    }

    event.toElement.className = event.toElement.className + ' checkedDayThere';

    const date = document.querySelector('[data-date=date]');
    toThere.value = `${event.toElement.textContent}.${Number(date.dataset.month) + 1}.${date.dataset.year}`;
  }
});

toThere.addEventListener('focus', (event) => {
  calendar.style.top = `${toThere.offsetTop + toThere.offsetHeight}px`;
  calendar.style.left = `${toThere.offsetLeft - ((calendar.clientWidth - toThere.offsetWidth) / 2)}px`;
});

toBack.addEventListener('focus', (event) => {
  const dataArr = splitString(String(toThere.value));
  console.log(`туда. День: ${dataArr[0]}; месяц: ${dataArr[1]}; год: ${dataArr[2]}`);

  makeCalendar('back', dataArr[2], dataArr[1]);

  calendar.style.top = `${toBack.offsetTop + toBack.offsetHeight}px`;
  calendar.style.left = `${toBack.offsetLeft - ((calendar.clientWidth - toBack.offsetWidth) / 2)}px`;
});


function splitString(stringToSplit) {
  const arrayOfStrings = stringToSplit.split('.');
  console.log('Массив: ' + arrayOfStrings[0]);
  return arrayOfStrings;
}





// makeCalendar();
makeCalendar(false, new Date().getFullYear(), new Date().getMonth());

// // переключатель минус месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
  if (checkbox.checked){ // или если месяц больше чем месяц отбытия/сегодня
    makeCalendar('next', document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)-1);
  }
}

// // переключатель плюс месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
  makeCalendar('next', document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)+1);
}