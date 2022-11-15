// google sheet

function googlesheetTask(messageText) {
  // 設定相應的欄位參數
  // var params = e.parameter; //這一個不要動
  const result = messageText.trim().split(/\s+/);
  var date = "date";
  var description = "description";
  var expense = 0;
  
  if(result.length < 3) {
    date = findSheet();
    description = result[0];
    expense = result[1];
  } else {
    date = result[0];
    description = result[1];
    expense = result[2];
    googlesheetDate(date);
  }

  //設定sheet資訊
  var SpreadSheet = SpreadsheetApp.openById("<your_google_doc_doc_ID>");
  var Sheet = SpreadSheet.getSheetByName("table1");// <your_sheet_name>
  var LastRow = Sheet.getLastRow();
  //資料寫入對應欄位中
  Sheet.getRange(LastRow+1, 1).setValue(date);
  Sheet.getRange(LastRow+1, 2).setValue(description);
  Sheet.getRange(LastRow+1, 4).setValue(expense);
}

function findSheet() {
  var SpreadSheet = SpreadsheetApp.openById("<your_google_doc_doc_ID>");
  var Sheet = SpreadSheet.getSheetByName("dateConst");// <your_sheet_name>
  var LastRow = Sheet.getLastRow();
  return Sheet.getRange(LastRow, 1).getValues()
}

function googlesheetDate(date) {
  var SpreadSheet = SpreadsheetApp.openById("<your_google_doc_doc_ID>");
  var Sheet = SpreadSheet.getSheetByName("dateConst");// <your_sheet_name>
  var LastRow = Sheet.getLastRow();
  Sheet.getRange(LastRow+1, 1).setValue(date);
}


// line bot
// not Channel secret 
var channelToken = '<your_channel_access_token>';

// bot default 訊息
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

// bot 根據 reply 回覆訊息
function replyMsg(replyToken, userMsg, channelToken) {
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

// quick reply
function quickReply(replyToken, channelToken) {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}/${month}/${day}`;

  var url = 'https://api.line.me/v2/bot/message/reply';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        //quick reply
        'type': "text",
        'text': "你想做啥啊",
        'quickReply': {
          "items": [
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "看看我的記事本",
                  "text": "lookUp"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "postback",
                  "label": "記今天的帳",
                  "data": "storeId=54321",
                  "inputOption": "openKeyboard",
                  "fillInText": `${currentDate} `
                }            
              },
              {
                "type": "action",
                "action": {
                  "type": "datetimepicker",
                  "label": "記之前的帳",
                  "data": "datetimepicker",
                  "mode": "date",
                }            
              }
            ]
        } 
      }]
    })
  };
  UrlFetchApp.fetch(url, opt);
}

function replyButtonTemplate(replyToken, channelToken) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [
        // bottonTemplate
        {
          "type": "template",
          "altText": "This is a buttons template",
          "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://cdn-icons-png.flaticon.com/512/2382/2382307.png",
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "來看看記帳本",
            "text": "你要看哪個哩～",
            "defaultAction": {
              "type": "uri",
              "label": "新的記帳本",
              "uri": "https://docs.google.com/spreadsheets/d/1dfu6vj-TNHD_nXSgKw4vcYlBZfYazbs6c1D8U7HQrGY/edit#gid=0"
            },
            "actions": [
              {
                "type": "uri",
                "label": "舊的記帳本",
                "uri": "https://docs.google.com/spreadsheets/d/1D_D1xcVxOL7P8qpA81rUEYaP_OoNHIT8/edit#gid=339835627"
              },
              {
                "type": "uri",
                "label": "新的記帳本",
                "uri": "https://docs.google.com/spreadsheets/d/1dfu6vj-TNHD_nXSgKw4vcYlBZfYazbs6c1D8U7HQrGY/edit#gid=0"
              }
            ]
          }
        }
      ]
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
            var data = event.postback.data
            if (data=="datetimepicker") {
              var specificDate = event.postback.params.date.trim().replaceAll("-", "/");
              googlesheetDate(specificDate);
              replyMsg(replyToken, `時間設定好咯 ${specificDate}`, channelToken);
              break;
            }
          case 'message':
            var messageType = event.message.type;
            // var messageId = event.message.id;
            var messageText = event.message.text; // 使用者的 Message_字串

            switch(messageType) {
              case 'text':
                if (messageText=="lookUp") {
                  replyButtonTemplate(replyToken, channelToken);
                } else {
                  googlesheetTask(messageText);
                  replyMsg(replyToken, "ok", channelToken);
                }
                break;
              case 'sticker':
                quickReply(replyToken, channelToken);
                break;
              default:
                replyMsg(replyToken, "抱歉不支援", channelToken);
                break;
            }    
          default:
            replyMsg(replyToken, "抱歉不支援", channelToken);
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
