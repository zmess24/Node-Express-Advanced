// Puppateer starts up Chromium
const puppeteer = require("puppeteer");

// Keep browser and page in global scope.
let browser, page;

// beforeEach gest invoked before every test.
beforeEach(() => { 
    // Opens up chromium browser
    browser = await puppeteer.launch({
      headless: false
    });

    // Open new tab and navigate to localhost:3000
    page = await browser.newPage();
    await page.goto('localhost:3000');
})

test('We can launch a browser', async () => {
    const text = page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');
});