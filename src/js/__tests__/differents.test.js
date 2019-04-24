import Differents from '../Differents';

test('Differents creating', () => {
  const inputDifferents = new Differents([17, 4, 2019], [20, 4, 2019]);

  const expected = { // ожидает
    diffDay: -3, // a[0] - b[0]
    diffMonth: 0, // a[1] - b[1]
    diffYear: 0, // a[2] - b[2]
  };

  const received = inputDifferents; // получает
  expect(received).toEqual(expected); // сравнивает
});

test('the same day/week/year', () => {
  const inputDifferents = new Differents([17, 4, 2019], [17, 4, 2019]);

  const expected = 0; // ожидает

  const received = inputDifferents.create(); // получает
  expect(received).toEqual(expected); // сравнивает
});

test('the next day/week/year', () => {
  const inputDifferents = new Differents([17, 4, 2019], [29, 4, 2019]);

  const expected = -1; // ожидает

  const received = inputDifferents.create(); // получает
  expect(received).toEqual(expected); // сравнивает
});

test('the last day/week/year', () => {
  const inputDifferents = new Differents([17, 4, 2019], [10, 4, 2019]);

  const expected = 1; // ожидает

  const received = inputDifferents.create(); // получает
  expect(received).toEqual(expected); // сравнивает
});
