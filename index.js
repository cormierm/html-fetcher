const express = require('express')
const {getHtml} = require('./src/fetcher');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 3000;

app.post('/', async (req, res) => {
    console.log('Fetching: ', req.body.url);
    const start = new Date();

    try {
        const html = await getHtml(req.body.url, req.body.delay);
        res.send(html);
    } catch (e) {
        console.log('Error: ' + e);
        res.status(500);
        res.send(e.message);
    }
    console.log(`${new Date() - start}ms`);
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})
