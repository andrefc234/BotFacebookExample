import puppeteer, { ElementHandle } from 'puppeteer';

async function runBot() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        await page.goto('https://www.facebook.com', { waitUntil: 'networkidle2' });

        // Enter credentials and log in
        await page.waitForSelector('#email');
        await page.type('#email', '4481273653');
        await page.type('#pass', 'Getmoney888$');

        // Click on the login button based on its inner text
        await page.waitForXPath('//button[contains(text(), "Log In")]');
        const [loginButton] = await page.$x('//button[contains(text(), "Log In")]');
        if (loginButton) {
            await (loginButton as ElementHandle<Element>).click(); // Explicit casting to ElementHandle<Element>
        } else {
            throw new Error('Login button not found');
        }
        
        // Wait for navigation after login
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // You can add further actions here, such as navigating to a profile
    } catch (error) {
        console.error('Bot encountered an error:', error);
    } finally {
        // await browser.close();
    }
}

runBot();
