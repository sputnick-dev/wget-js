const puppeteer = require('puppeteer');

(async () => {
    var url = process.argv[2];
    if (!url) {
        console.error('Usage: ' + process.argv[1] + ' <URL>');
        process.exit(1);
    }
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36");
    //await page.goto(url, { waitUntil: 'networkidle2' });
    await page.goto(url);
    await page.waitForTimeout(10000); // This will wait for 10 seconds. Feel free to adapt.
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    console.log(html);
    browser.close();
})()
