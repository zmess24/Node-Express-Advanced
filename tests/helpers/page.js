// Puppeteer starts up Chromium
const 
    puppeteer = require('puppeteer'),
    sessionFactory = require('../factories/sessionFactory'),
    userFactory = require('../factories/userFactory');

class CustomPage {
    static async build() {
        // Opens up chromium browser.
        const browser = await puppeteer.launch({ headless: false });
        // Opens up new tab in chromium instance.
        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: function(target, property) {
                return customPage[property] || browser[property] || page[property];
            }
        });
    }

    constructor(page) {
        this.page = page;
    }

    async login() {
        const user = await userFactory();
        const { session, sig } = sessionFactory(user);
        // Set session and session sig cookies.
        await this.setCookie({ name: 'session', value: session });
        await this.setCookie({ name: 'session.sig', value: sig });
        // Refresh the page to allow cookies to set.
        await this.goto('localhost:3000/blogs');
        // Wait for DOM to finish loading to select element.
        await this.waitFor('a[href="/auth/logout"]');
    }
    
    async getContentsOf(selector) {
        return this.page.$eval(selector, el => el.innerHTML);
    }
};

module.exports = CustomPage;