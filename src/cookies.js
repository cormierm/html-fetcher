const fs = require('fs').promises;

const restore = async (page, filename) => {
    try {
        const cookiesString = await fs.readFile(`cookies/${filename}.json`);
        const cookies = JSON.parse(cookiesString);
        await page.setCookie(...cookies);
    } catch (err) {
        console.log(`Could not read cookie ${filename}.json`);
    }
}

const save = async (page, filename) => {
    const cookies = await page.cookies();
    await fs.writeFile(`cookies/${filename}.json`, JSON.stringify(cookies, null, 2));
}

module.exports = {restore, save};
