const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')

puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin())

const browser = puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
});

const withBrowser = async (callback) => {
    return callback(await browser);
}

const getHtml = async (url) => {
    return withBrowser(async (browser) => {
        const page = await browser.newPage();

        await page.goto(url);

        const html = await page.content();

        page.close();

        return html;
    });
}

module.exports = {getHtml}
