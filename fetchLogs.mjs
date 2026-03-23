import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('BROWSER ERROR:', msg.text());
        msg.args().forEach(arg => {
           console.log(arg.toString());
        });
      }
    });

    page.on('pageerror', err => {
      console.log('PAGE UNCAUGHT EXCEPTION:', err.toString());
    });

    console.log('Navigating...');
    await page.goto('http://localhost:5173/dashboard');
    
    await page.waitForTimeout(2000);
    
    console.log('Clicking the first test project...');
    // find 'Manage Pages' link
    const links = await page.$$('a');
    for(const l of links) {
       const text = await page.evaluate(el => el.textContent, l);
       if(text && text.includes('Manage Pages')) {
           await l.click();
           break;
       }
    }
    
    await page.waitForTimeout(2000);
    
    console.log('Clicking builder button...');
    const btns = await page.$$('button');
    for(const b of btns) {
       const text = await page.evaluate(el => el.textContent, b);
       if(text && (text.includes('Builder') || text.includes('builder') || text.includes('Open'))) {
           await b.click();
           break;
       }
    }
    
    await page.waitForTimeout(5000);

    await browser.close();
    console.log('Done!');
  } catch (err) {
    console.error('Puppeteer Script Error:', err);
  }
})();
