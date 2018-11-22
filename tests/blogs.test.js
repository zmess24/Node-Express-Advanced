const Page = require('./helpers/page');

let page;

beforeEach(async() => {
    page = await Page.build();
});

afterEach(async() => {
    await page.close();
})