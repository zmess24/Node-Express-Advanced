const 
    Page = require('./helpers/page');
    
// Keep page in global scope.
let page;

// beforeEach gets invoked before every test.
beforeEach(async () => { 
    page = await Page.build();
    await page.goto('localhost:3000');
});

// afterEach gets invoked after every test.
afterEach(async() => {
    await page.close();
});

test('The header has the correct text', async () => {
    const text = await page.getContentsOf('a.brand-logo');
    expect(text).toEqual('Blogster');
});

test('Clicking login starts the oauth flow', async () => {
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/)
});

test('When signed in, shows logout button', async () => {
    await page.login();
    const text = await page.getContentsOf('a[href="/auth/logout"]');
    expect(text).toEqual('Logout');
});