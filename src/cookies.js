const crypto = require("crypto");
const fs = require('fs').promises;

const restore = async (page, url) => {
    const filename = generateFilename(url);
    try {
        const cookiesString = await fs.readFile(`cookies/${filename}.json`);
        const cookies = JSON.parse(cookiesString);
        await page.setCookie(...cookies);
    } catch (err) {
        console.log(`Could not read cookie ${filename}.json`);
    }
}

const save = async (page, url) => {
    const filename = generateFilename(url);
    const cookies = await page.cookies();
    await fs.writeFile(`cookies/${filename}.json`, JSON.stringify(cookies, null, 2));
}

const generateFilename = (url) => (new URL(url)).hostname + '-' + crypto.createHash('md5').update(url).digest('hex');

module.exports = {restore, save};
