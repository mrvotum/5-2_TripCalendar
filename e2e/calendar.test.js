const puppeteer = require('puppeteer');
const { fork } = require('child_process');

jest.setTimeout(30000); // default puppeteer timeout
describe('Click to button', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8080';
  beforeAll(async () => { // открыть браузер
    server = fork(`${__dirname}/test-server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch({
      // comment everything for appveyor
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  }); // открыть браузер
  afterAll(async () => { // закрыть браузер
    await browser.close();
    server.kill();
  }); // закрыть браузер
  test('should create the second input', async () => {
    await page.goto(baseUrl);

    const checkbox = await page.$('[data-id=checkbox]');
    checkbox.click();

    await page.waitForSelector('[data-id=backInput]');
    // TODO:
  });
});
