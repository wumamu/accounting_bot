# Accounting LineBot
accounting line bot integrated with google sheet using google script

## Features

- [ButtonTemplate](https://developers.line.biz/en/reference/messaging-api/#template-messages)
  - Uri Action
- Quick Reply
  - Message (看看我的記事本 -> Call ButtonTemplate) 
  - [Postback Action](https://developers.line.biz/en/reference/messaging-api/#postback-action) (記今天的帳) 
  - [DatePicker Action](https://developers.line.biz/en/reference/messaging-api/#uri-action) (記之前的賬)
- Handel Event
  - [Postback Event](https://developers.line.biz/en/reference/messaging-api/#postback-event)

## Demo Video
[![IMAGE_ALT](https://img.youtube.com/vi/IN5WDUfzqL4/0.jpg	)](https://youtube.com/shorts/IN5WDUfzqL4?feature=share)

## How to implement it from 0 to 1
1. 註冊Line Developer，取得channelToken，輸入到script.js的 <your_channel_access_token> 欄位
2. 建立google sheet，開啟擴充功能 -> Apps google Script (script.js 直接複製)！！！(要從這裡開檔案)
3. script 輸入自己的google sheet ID 以及 工作表名稱
4. 把scipt 產生的 Webhook URL 貼回到 LINE developer剛建立的 [LINE Bot頁面](https://developers.line.biz/console/channel/1656930755/messaging-api)

### Reference
- Line Bot Api Related
   - [Line Messaging API 的各種訊息格式](https://ithelp.ithome.com.tw/articles/10198142)
   - [Day07 進階訊息傳送1 - Actions](https://ithelp.ithome.com.tw/articles/10241194)
   - [使用 Quick Reply 改善 Line Bot 互動](https://ithelp.ithome.com.tw/articles/10266375)
   - [[Day12] LINE Bot 的快速回覆功能 - Quick Reply](https://ithelp.ithome.com.tw/articles/10229687)
   - [聊天機器人的Quick replies](https://medium.com/@jasonb0604/chatbot%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-day6-30745ce05994)
   - [LINE 新功能測試: Quick Reply 支援 URI Action](https://taichunmin.idv.tw/blog/2021-03-11-line-quickreply-uri.html)
- Google Script & Google Sheet
  - [Use Google App Script to Create a Line bot Reminder](https://medium.com/nerd-for-tech/use-google-app-script-to-create-a-line-bot-reminder-ebf5f8a8a1dc)
  - [[教學] 利用 Google Script 將 Google Sheet試算表，變成簡易資料庫使用(寫入篇)](https://www.minwt.com/pc/22105.html)
  - [Google Apps Script實作LINE Bot](https://medium.com/@f1236920001/google-apps-script%E5%AF%A6%E4%BD%9Cline-bot-b8e613b81fd1)
- Message Type Event Handle
  - [LINE chatbot 系列 — 拆解 LINE webhook event type & message type](https://medium.com/coding-with-fun-favor/%E6%8B%86%E8%A7%A3-line-webhook-event-type-message-type-2941beee0b79) 
### More
- https://developers.line.biz/media/messaging-api/using-bot-designer/bot-designer-user-manual.pdf
- [1 個月內累積破萬使用者：大學科系查詢 LINE 機器人製作分享](https://jcshawn.com/dpsearch-bot-development-journal/)
- https://github.com/clarencetw/line-bot/tree/1595b88bc828431c6996bcf1710a06e83bd01f58
