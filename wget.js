import { chromium } from 'playwright';

(async () => {
    const url = process.argv[2];
    if (!url) {
        console.error('Usage: ' + process.argv[1] + ' <URL>');
        process.exit(1);
    }

    try {
        const resx = 1920;
        const resy = 1080;

        // Launch the browser (headless by default)
        const browser = await chromium.launch({
            headless: true,
            args: [
                `--window-size=${resx},${resy}`,
                '--disable-infobars',
                '--disable-extensions',
                '--disable-blink-features=AutomationControlled',
                '--password-store=basic',
                '--disable-notifications',
                '--lang=en,en_EN'
            ]
        });

        const context = await browser.newContext({
            viewport: { width: resx, height: resy },
            userAgent: "Mozilla/5.0 (Linux; X11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
            locale: 'en-EN',
        });

        const page = await context.newPage();

        // Playwright smartly waits for the page to be ready
        await page.goto(url, { waitUntil: 'networkidle' });

        // Get the full HTML after JS rendering
        const html = await page.content();
        console.log(html);

        await context.close();
        await browser.close();
    } catch (err) {
        console.error('Playwright error:', err);
        process.exit(1);
    }
})();
