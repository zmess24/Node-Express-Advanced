// Puppeteer starts up Chromium
const puppeteer = require('puppeteer');

class CustomPage {
    static async build() {
        // Opens up chromium browser.
        const browser = await puppeteer.launch({ headless: false });
        // Opens up new tab in chromium instance.
        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: function(target, property) {
                return customPage[property] || page[property] || browser[property];
            }
        });
    }

    constructor(page) {
        this.page = page;
    }
};

module.exports = CustomPage;