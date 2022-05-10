const cookies = require('./cookies');
const puppeteer = require('puppeteer');

const browser = puppeteer.launch({
    headless: process.argv.includes('--headless'),
});

const withBrowser = async (callback) => {
    return callback(await browser);
}

const getHtml = async (url, delay, userAgent) => {
    return withBrowser(async (browser) => {

        const page = await browser.newPage();
        if (userAgent) {
            await page.setUserAgent(userAgent);
        }
        await page.setDefaultNavigationTimeout(60000);

        try {
            await cookies.restore(page, url);

            await page.goto(url, {waitUntil: 'networkidle0'});

            await page.waitForTimeout(delay);

            const html = await page.content();

            await cookies.save(page, url);

            page.close();

            return html;
        } finally {
            page.close();
        }
    });
}

module.exports = {getHtml}
