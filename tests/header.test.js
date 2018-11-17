// Puppateer starts up Chromium
const puppeteer = require("puppeteer");

test('Adds two numbers', () => { // Description of test
    const sum = 1 + 2;
    expect(sum).toEqual(3); // Equivilent of assert
});

test('We can launch a browser', async () => {
    // Opens up chromium browser
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
});