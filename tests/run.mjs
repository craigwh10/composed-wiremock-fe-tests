import puppeteer from 'puppeteer';
import * as assert from "assert";

(async () => {
    let page;
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
            args: [
                '--no-sandbox'
            ]
        });

        page = await browser.newPage();

        await page.goto(process.env.URL_TO_TEST);

        await page.setViewport({width: 1080, height: 1024});
        const title = await page.waitForSelector('.title');
        const fullTitle = await title?.evaluate(el => el.textContent);

        await page.screenshot({
            path: './screenshots/success.jpeg'
        })
        assert.equal(fullTitle, 'My Dashboard')
        console.log('success!')
    } catch (err) {
        await page.screenshot({
            path: './screenshots/error.jpeg'
        })
        console.log('ERROR', err);
    } finally {
        await browser.close();
    }
})();