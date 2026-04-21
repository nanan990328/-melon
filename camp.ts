import fs from "fs"
import puppeteer, { Page } from "puppeteer"

import {
  CHECK_BEST,
  CONCERT_URL,
  COOKIES_JSON,
  IS_HEADLESS,
  LOOPS,
  NIGHT,
  YOUTUBE_VIDEO,
  delay,
  loadBrowser,
} from "./shared"

// 1. 定义加载 Cookie 的逻辑
const loadCookies = async (page: Page) => {
  const cookiesData = fs.readFileSync(COOKIES_JSON, "utf-8")
  const cookies = JSON.parse(cookiesData)
  await page.setCookie(...cookies)
  await page.waitForNetworkIdle()
}

// 2. 启动浏览器
const browser = await puppeteer.launch({ headless: IS_HEADLESS })
const page = await browser.newPage()

// 3. 监听弹窗
const newPagePromise = new Promise((resolve) => {
  browser.on("targetcreated", async (target) => {
    if (target.type() === "page") {
      const newPage = await target.page()
      await newPage?.setViewport({ width: 1400, height: 1400 })
      resolve(newPage)
    }
  })
})

// 4. 执行登录和跳转
await loadCookies(page)
await loadBrowser(page, CONCERT_URL)

// 5. 选择日期
const dates = await page.$$("#box_list_date #list_date li")
if (dates[NIGHT]) {
  await dates[NIGHT].click()
}
await page.waitForNetworkIdle()

// 6. 点击预约按钮
await page.locator(".reservationBtn").click()
await page.waitForNetworkIdle()

// 7. 进入选座弹窗
const newPage = (await newPagePromise) as Page
await newPage.locator("#btn_later").click()
await newPage.waitForNetworkIdle()

// 8. 寻找包含座位的 Frame
const frames = newPage.frames()
let targetFrame
for (const frame of frames) {
  const seats = await frame.$(".box_seat_inner #divGradeSummary [id^=gd]")
  if (seats) {
    targetFrame = frame
    break
  }
}

// 9. 打开区域类别（比如 VIP/普通席）
let categories = (await targetFrame?.$$(".box_seat_inner #divGradeSummary [id^=gd]")) || []
if (!CHECK_BEST) categories = categories.slice(1)
for (const category of categories) {
  await category.click()
}

// 10. 开始循环刷票
const sections = (await targetFrame?.$$(".box_list_area li")) || []

let i = 0
while (i < LOOPS) {
  for (const section of sections) {
    // --- 你的过滤逻辑 ---
    const secName = await (await section.getProperty("textContent")).jsonValue() as string;
    const myTargetSections = ["Sec 11", "Sec 12"];// 这里填你想要的区域

    if (!myTargetSections.some(target => secName.includes(target))) {
        continue; 
    }
    // -------------------

    const box = await section.boundingBox()
    if (box) {
      await section.click()

      const fills = await targetFrame?.$$eval("#ez_canvas svg rect", (rects) =>
        rects.map((rect) => rect.getAttribute("fill"))
      )

      const colours = new Set(fills)
      colours.delete("none")

      if (colours.size > 1) {
        console.log("找到票了! 区域是:", secName)
        i = 9999 // 设置一个大数来跳出循环
        break
      }
    }
    await delay(800)
  }
  i++
}

// 11. 扫尾工作
if (i < 9999) {
  console.log("刷票结束，没找到位子。")
  await browser.close()
} else {
  // 抢到票了，打开 YouTube 报警
  const youtube = await browser.newPage()
  await loadBrowser(youtube, YOUTUBE_VIDEO + "&themeRefresh=1")
  await youtube.locator(".ytp-play-button").click()
}

console.log("After", i, "loops, we've finished.")
