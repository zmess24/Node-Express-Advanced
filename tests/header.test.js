const 
    sessionFactory = require('./factories/sessionFactory'),
    userFactory = require('./factories/userFactory'),
    Page = require('./helpers/page');
    
// Keep browser and page in global scope.
let page;

// beforeEach gest invoked before every test.
beforeEach(async () => { 
    page = await Page.build();
    await page.goto('localhost:3000');
});

afterEach(async() => {
    await page.close();
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
    const user = await userFactory();
    const { session, sig } = sessionFactory(user);
    // Set session and session sig cookies.
    await page.setCookie({ name: 'session', value: session });
    await page.setCookie({ name: 'session.sig', value: sig });
    // Refresh the page to allow cookies to set.
    await page.goto('localhost:3000');
    // Wait for DOM to finish loading to select element.
    await page.waitFor('a[href="/auth/logout"]');

    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    expect(text).toEqual('Logout');
    
});