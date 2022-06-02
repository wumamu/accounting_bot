// google sheet

function googlesheetTask(messageText) {
  //設定相應的欄位參數
  const result = messageText.trim().split(/\s+/);
  var date = result[0];
  var description = result[1];
  var expense = result[2];

  // var params = e.parameter; //這一個不要動
  // var date = params.date;
  // var description = params.description;
  // var income = params.income;
  // var expense = params.expense;
  // var total_all = params.total_all;
  // var total_by_month = params.total_by_month;
  // var address = params.order_address;
  // var invoice = params.order_invoice;
  // var ps = params.order_ps;
  //設定sheet資訊
  var SpreadSheet = SpreadsheetApp.openById("<your_google_doc_doc_ID>");
  var Sheet = SpreadSheet.getSheetByName("<your_sheet_name>");
  var LastRow = Sheet.getLastRow();
  //資料寫入對應欄位中
  Sheet.getRange(LastRow+1, 1).setValue(date);
  Sheet.getRange(LastRow+1, 2).setValue(description);
  // Sheet.getRange(LastRow+1, 3).setValue(income);
  Sheet.getRange(LastRow+1, 4).setValue(expense);
  // Sheet.getRange(LastRow+1, 5).setValue(total_all);
  // Sheet.getRange(LastRow+1, 6).setValue(total_by_month);
  // Sheet.getRange(LastRow+1, 7).setValue(address);
  // Sheet.getRange(LastRow+1, 8).setValue(invoice);
  // Sheet.getRange(LastRow+1, 9).setValue(ps);
  //當資料寫入完成後，回傳資訊
  // retun true;
  // return ContentService.createTextOutput("成功");
}

//line bot

var channelToken = '<your_channel_access_token>';

// 回覆訊息
function replyMsg(replyToken, userMsg, channelToken) {
  const myArray = userMsg.split("$");
  // var customReplyMsg = "No"
  // if(myArray[2].includes("+")){
  //   customReplyMsg = "Yes"
  // }
  var url = 'https://api.line.me/v2/bot/message/reply';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{'type': 'text', 'text': userMsg}]
    })
  };
  UrlFetchApp.fetch(url, opt);
}
// 發送訊息
function pushMsg(channelToken, message, usrId) {
  var url = 'https://api.line.me/v2/bot/message/push';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'to': usrId,
      'messages': [{'type': 'text', 'text': message}]
    })
  };
  UrlFetchApp.fetch(url, opt);
}

// e 是Line 給我們的資料
function doPost(e) {
  console.log('info:' + e.postData.contents);
  var value = JSON.parse(e.postData.contents);
  try {
    var events = value.events;
    if (events != null) {
      for (var i in events) {
        var event = events[i];
        var type = event.type;
        var replyToken = event.replyToken; // 要回復訊息 reToken
        var sourceType = event.source.type;
        var sourceId = LineHelpers.getSourceId(event.source);
        var userId = event.source.userId; // 取得個人userId
        var groupId = event.source.groupId; // 取得群組Id
        var timeStamp = event.timestamp;
        switch (type) {
          case 'postback':
            break;
          case 'message':
            var messageType = event.message.type;
            var messageId = event.message.id;
            var messageText = event.message.text; // 使用者的 Message_字串
            googlesheetTask(messageText)
            replyMsg(replyToken, "ok", channelToken);
            // replyMsg(replyToken, userId+"$"+groupId+"$"+messageText, channelToken);
            replyMsg(replyToken, "success", channelToken);
            break;
          case 'join':
            pushMsg(channelToken, '我是Bot！Hello！', sourceId);
            break;
          case 'leave':
            pushMsg(channelToken, 'Good Bye！', sourceId);
            break;
          case 'memberLeft':
            pushMsg(channelToken, '我是Bot！Bye！', sourceId);
            break;
          case 'memberJoined':
            pushMsg(channelToken, '我是Bot！Hello~', sourceId);
            break;
          case 'follow':
            pushMsg(channelToken, 'Hello！', sourceId);
            break;
          case 'unfollow':
            pushMsg(channelToken, 'Bye bye！', sourceId);
            break;
          default:
            break;
        }
      }
    }
  } catch(ex) {
    console.log(ex);
  }
}

var LineHelpers = (function (helpers) {
  'use strict';
  helpers.getSourceId = function (source) {
    try {
      switch (source.type) {
        case 'user':
          return source.userId;
          break;
        case 'group':
          return source.groupId;
          break;
        case 'room':
          return source.roomId;
          break;
        default:
          console.log('LineHelpers, getSourceId, invalid source type!');
          break;
      }
    } catch (ex) {
      console.log('LineHelpers, getSourceId, ex = ' + ex);
    }
  }; 
  return helpers;
})(LineHelpers || {});