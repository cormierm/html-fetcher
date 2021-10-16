const cookies = require('./cookies');
const crypto = require('crypto');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin())

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

        await cookies.restore(page, generateHash(url));

        await page.goto(url, {waitUntil: 'networkidle0'});

        await page.waitForTimeout(delay);

        const html = await page.content();

        await cookies.save(page, generateHash(url));

        page.close();

        return html;
    });
}

const generateHash = (url) => crypto.createHash('md5').update(url).digest('hex');

module.exports = {getHtml}
