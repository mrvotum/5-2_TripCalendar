import CreateCalendar from '../CalendarMake';

test('CreateCalendar creating', () => {
  const inputCreateCalendar = new CreateCalendar();
  const today = new Date();

  const expected = { // ожидает
    dateNow: today,
    monthArr: [
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
      'Декабрь',
    ],
  };

  const received = inputCreateCalendar; // получает
  expect(received).toEqual(expected); // сравнивает
});

// получить номер дня недели, от 0(пн) до 6(вс)
test('getDay', () => {
  const inputCreateCalendar = new CreateCalendar();
  const today = new Date(2019, 3, 17);

  const expected = 2; // ожидает

  const received = inputCreateCalendar.getDay(today); // получает
  expect(received).toEqual(expected); // сравнивает
});

// получить номер месяца, от 1(январь) до 12(декабрь)
test('splitString', () => {
  const inputCreateCalendar = new CreateCalendar();
  const stringToSplit = 'Апрель 2019';

  const expected = [4, 2019]; // ожидает

  const received = inputCreateCalendar.splitString(stringToSplit); // получает
  expect(received).toEqual(expected); // сравнивает
});
