import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.google.com/');
});

test.describe('Google Search', () => {
  // let inputSearch;
  // test.beforeEach(async ({page}) => {
  //   await page.goto('https://google.com'); // 1.
  //   inputSearch = await page.$('textarea[name="q"]'); // 2.
  // })
  test('TEST#1', async ({page}) => {
    await page.goto('https://google.com');
    const inputSearch = await page.$('textarea[name="q"]');
    await inputSearch?.type('ขนมหวานไทย');
    await inputSearch?.press('Enter');
    await page.waitForTimeout(1000);
    
    const resultStat = await page.$('div[id="result-stats"]');
    expect(resultStat).not.toEqual('ผลการค้นหาประมาณ 0 รายการ');
  });

  test('TEST#2', async({page}) => {
    await page.goto('https://google.com');
    const inputSearch = await page.$('textarea[name="q"]');
    await inputSearch?.type('  ');
    await inputSearch?.press('Enter');
    await page.waitForTimeout(1000);

    expect(page.url()).toBe('https://www.google.com/');
    expect(page.url()).not.toContain('/search');
  });

  test('TEST#3', async ({page}) => {
    await page.goto('https://google.com');
    const inputSearch = await page.$('textarea[name="q"]');
    await inputSearch?.type('ขนมหวานไทย');
    await inputSearch?.press('Enter');
    await page.waitForTimeout(1000);
    (await page.$('textarea[name="q"]'))?.press('Enter');
    await page.waitForTimeout(1000);
    (await page.$('textarea[name="q"]'))?.press('Enter');
    await page.waitForTimeout(1000);

    const resultStat = await page.$('div[id="result-stats"]');
    expect(resultStat).not.toEqual('ผลการค้นหาประมาณ 0 รายการ');
  });

});