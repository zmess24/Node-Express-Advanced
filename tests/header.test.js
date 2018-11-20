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

test('The header has the correct text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
});

test('Clicking login starts the oauth flow', async () => {
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/)
});

test('When signed in, shows logout button', async () => {
    // MongoDB user id.
    const id = '5be5197b435c060d8bd44652';

    // Set session and session sig cookies.
    await page.setCookie({ name: 'session', value: sessionString });
    await page.setCookie({ name: 'session.sig', value: sig });
    // Refresh the page to allow cookies to set.
    await page.goto('localhost:3000');
    // Wait for DOM to finish loading to select element.
    await page.waitFor('a[href="/auth/logout"]');

    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    expect(text).toEqual('Logout');
    
});