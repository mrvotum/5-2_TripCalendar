import DatePicker from '../src/js/class_datePicker';

test('DatePicker creating', () => {
  const inputDatePicker = new DatePicker();
  const today = new Date();

  const expected = { // ожидает
    toThere: document.querySelector('[data-input=toThere]'),
    toBack: document.querySelector('[data-input=toBack]'),
    checkbox: document.querySelector('#checkbox'),
    calendar: document.querySelector('#calendar'),
    holder: document.querySelector('#holder'),

    toThereChecked: 0,
    control: 0,
    btn: 'no',

    dateNow: today,
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  };

  const received = inputDatePicker; // получает
  expect(received).toEqual(expected); // сравнивает
});