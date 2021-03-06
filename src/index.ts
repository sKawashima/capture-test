import * as puppeteer from 'puppeteer'

export const squareCapture = async (url:string, fileName?: string) => {
  const browser = await puppeteer.launch({
    headless: true
  })

  // await getCapture(url, fileName, browser, 390, 325, 'min')
  await getCapture(url, fileName, browser, 375, 375, 'square')

  await browser.close()
}

const getCapture = async (url:string, fileName:string,  browser:puppeteer.Browser, width:number, height:number, mode:string) => {
  const page = await browser.newPage()
  await page.emulate(puppeteer.devices['iPhone 8'])
  await page.setViewport({width: width,height: height})
  console.log(`Load: ${url}`);
  await page.goto(url)
  await page.waitFor(1000)
  await page.screenshot({
    path: `${fileName ? `${__dirname}/output/${fileName}_${mode}.png` : `${__dirname}/output/${Date.now()}_${mode}.png`}`
  })
  console.log(`Save: ${fileName ? `${__dirname}/output/${fileName}_${mode}.png` : `${__dirname}/${Date.now()}_${mode}.png`}`);
  await page.close()
}

// test
squareCapture('https://www.workman.co.jp/workman-plus', 'workman-plus')
squareCapture('https://www.seria-m.jp/sp/', 'seria')
squareCapture('https://www.marugame-seimen.com/', 'marugame-seimen')
squareCapture('https://www.ueshima-coffee-ten.jp/', 'ueshima-coffe_square')
squareCapture('https://www.starbucks.co.jp/', 'starbucks-coffee_square')
