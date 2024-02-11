const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const path = require('path');
const port = 4000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/search', async (req, res) => {
   const url = req.query.url;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const titles = await page.evaluate(() => {
            const titleElements = Array.from(document.querySelectorAll('title'));
            return titleElements.map(title => title.textContent);
        });
        await browser.close();
        res.json({ titles });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
