const cookies = require('./cookies');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const browser = puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false,
});

const withBrowser = async (callback) => {
    return callback(await browser);
}

const getHtml = async (url, delay) => {
    return withBrowser(async (browser) => {

        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(60000);

        try {
            await cookies.restore(page, generateFilename(url));

            await page.goto(url, {waitUntil: 'networkidle0'});

            await page.waitForTimeout(delay);

            const html = await page.content();

            await cookies.save(page, generateFilename(url));

            page.close();

            return html;
        } catch(e) {
            page.close();

            throw e;
        }
    });
}

const generateFilename = (url) => (new URL(url)).hostname + '-' + crypto.createHash('md5').update(url).digest('hex');

module.exports = {getHtml}
