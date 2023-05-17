import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.google.com/');
});


test.describe('Google Search', () => {
  // test('should search and get data', async ({ page }) => {
  //   const inputSearch = await page.$('textarea[name="q"]');
  //   await inputSearch?.type('ขนมหวานไทย');
  //   await inputSearch?.press('Enter');

  //   // await page.waitForURL('https://www.google.com/search*');
  //   await page.waitForTimeout(1000);
  //   const resultStat = await page.$('div[id="result-stats"]');

  //   expect(resultStat).not.toEqual('About 0 results');
  // });  

  test('should search with "!!" and get data', async ({ page }) => {
    const inputSearch = await page.$('textarea[name="q"]');
    await inputSearch?.type('!!');
    await inputSearch?.press('Enter');

    await page.waitForURL('https://www.google.com/search*');
    const resultStat = await page.$('div[id="result-stats"]');
    expect(resultStat).not.toEqual('About 0 results');
  }); 
  
  test('should search again without typing more text',  async ({ page }) => {
    const inputSearch = await page.$('textarea[name="q"]');
    await inputSearch?.type('ขนมหวานไทย');
    await inputSearch?.press('Enter');
    await inputSearch?.press('Enter');
    page.waitForTimeout(500)

    await page.waitForURL('https://www.google.com/search*');
    const resultStat = await page.$('div[id="result-stats"]');
    expect(resultStat).not.toEqual('About 0 results');
  });

  test('should search by typing a new word after the original word that has been typed previously', async ({ page }) => {
    const inputSearch1 = await page.$('textarea[name="q"]');
    await inputSearch1?.type('ขนม');
    await inputSearch1?.press('Enter');
    await page.waitForURL('https://www.google.com/search*');

    const inputSearch2 = await page.$('textarea[name="q"]');
    await inputSearch2?.type('ขนมหวานไทย');
    await inputSearch2?.press('Enter');
    await page.waitForURL('https://www.google.com/search*');

    const resultStat = await page.$('div[id="result-stats"]');
    expect(resultStat).not.toEqual('About 0 results')
  });

  test('should search without entering information', async ({ page }) => {
    const inputSearch = await page.$('textarea[name="q"]');
    await inputSearch?.press('Enter');

    await page.waitForTimeout(1000);
    expect(page.url()).not.toContain('/search')
  });

  test('should search with "flower" and press search', async ({ page }) => {
    const inputSearch = await page.$('textarea[name="q"]');
    await inputSearch?.type('flower');
    await inputSearch?.press('Enter');
    await page.waitForTimeout(1000);
    await inputSearch?.press('Enter');
    await page.waitForTimeout(1000);
    await inputSearch?.press('Enter');
    await page.waitForTimeout(1000);
   
    
    await page.waitForURL('https://www.google.com/search*');
    const resultStat = await page.$('div[id="result-stats"]');

    expect(resultStat).not.toEqual('About 0 results');
  });

  test('should search with "flower" and press delete and press search again',async ({ page }) => {
    const inputSearch1 = await page.$('textarea[name="q"]');
    await inputSearch1?.type('flower');
    await inputSearch1?.press('Enter');
    await page.waitForURL('https://www.google.com/search*');

    const inputSearch2 = await page.$('textarea[name="q"]');
    await inputSearch2?.press('Delete');
    await inputSearch2?.press('Enter');
    await page.waitForURL('https://www.google.com/search*');
    
    const resultStat = await page.$('div[id="result-stats"]');
    expect(resultStat).not.toEqual('About 0 results');
  });

  test('should search Press "space-bar" in the search box and press the search button again', async ({ page }) => {
    const inputSearch = await page.$('textarea[name="q"]');
    await inputSearch?.type(' ');
    await inputSearch?.press('Enter');
    await page.waitForTimeout(1000);

    await page.waitForURL('https://www.google.com/search*');
    const resultStat = await page.$('div[id="result-stats"]');

    expect(page.url()).not.toContain('/search')
    expect(page.url()).not.toContain('https://www.google.com/')
  });
  
  // test('should search Type text with space and press search', async ({ page }) => {
  //   const inputSearch = await page.$('textarea[name="q"]');
  //   await inputSearch?.type('  ปลูกต้นไม้  ');
  //   await inputSearch?.press('Enter');

  //   await page.waitForURL('https://www.google.com/search*');

  //   const resultStat = await page.$('div[id="result-stats"]');
  //   expect(resultStat).not.toEqual('About 0 results')
  // });

});