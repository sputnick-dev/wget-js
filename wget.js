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

        // Lance le navigateur (headless par défaut)
        const browser = await chromium.launch({
            headless: true,
            args: [
                `--window-size=${resx},${resy}`,
                '--disable-infobars',
                '--disable-extensions',
                '--disable-blink-features=AutomationControlled',
                '--password-store=basic',
                '--disable-notifications',
                '--lang=fr,fr_FR'
            ]
        });

        const context = await browser.newContext({
            viewport: { width: resx, height: resy },
            userAgent: "Mozilla/5.0 (Linux; X11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
            locale: 'fr-FR',
        });

        const page = await context.newPage();

        // Playwright attend intelligemment que la page soit prête
        await page.goto(url, { waitUntil: 'networkidle' });

        // Récupère le HTML complet après rendu JS
        const html = await page.content();
        console.log(html);

        await context.close();
        await browser.close();
    } catch (err) {
        console.error('Playwright error:', err);
        process.exit(1);
    }
})();
