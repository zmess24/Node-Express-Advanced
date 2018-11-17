// Puppateer starts up Chromium
const puppeteer = require("puppeteer");

// Keep browser and page in global scope.
let browser, page;

// beforeEach gest invoked before every test.
beforeEach(async () => { 
    // Opens up chromium browser
    browser = await puppeteer.launch({ headless: false });
    // Open new tab and navigate to localhost:3000
    page = await browser.newPage();
    await page.goto('localhost:3000');
});

afterEach(async() => {
    await browser.close();
});

test('the header has the correct test', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
});

test('clicking login starts the oauth flow', async () => {
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/)
});