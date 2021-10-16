const fs = require('fs').promises;

const restore = async (page, filename) => {
    console.log('Restoring cookies');
    try {
        const cookiesString = await fs.readFile(`cookies/${filename}.json`);
        const cookies = JSON.parse(cookiesString);
        await page.setCookie(...cookies);
    } catch (err) {
        console.log(`Could not read ${filename}.json`);
    }
}

const save = async (page, filename) => {
    console.log('Saving cookies');
    const cookies = await page.cookies();
    await fs.writeFile(`cookies/${filename}.json`, JSON.stringify(cookies, null, 2));
}

module.exports = {restore, save};