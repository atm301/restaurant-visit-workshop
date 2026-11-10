# 餐廳有曝光，為什麼客人還是不來？｜美食映象餐飲學院

2026.11.10（二）上午場的課堂網站：四道門（看對人、被看見、走進來、再回來）、互動題、提示詞、10 題網路行銷健檢與交件。

- 學員網站：https://atm301.github.io/restaurant-visit-workshop/
- 講師後台：https://atm301.github.io/restaurant-visit-workshop/admin.html
- 投影頁：https://atm301.github.io/restaurant-visit-workshop/board.html
- 梯次預設是當天日期，要指定就加 `?c=梯次名稱`

## 改內容

改 `p1.html` 到 `p11.html`，再跑 `node build.mjs` 合併成 `index.html`（會檢查語法、重複 id、全形破折號）。

- p1 頁首與樣式、p2 開始與看對人、p4 被看見、p5 走進來、p6 再回來、p7 換你的店、p8 提示詞與健檢帶走
- p9 資料（互動題正解、健檢題目、店型）、p10 邏輯、p11 事件

## 資料

共用 Supabase `lw_line_students`（course＝`restaurant-visit-workshop`）與 `lw_workshop_submissions`，圖片在 `lw-workshop` bucket。

互動題正解依簡報順序：C D C C A B B。
