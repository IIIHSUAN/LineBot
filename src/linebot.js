require('dotenv').config();
const _channel={
	channelId: process.env._CHANNEL_ID,
	channelSecret: process.env._CHANNEL_SECRET,
	channelAccessToken: process.env._CHANNEL_ACCESS_TOKEN
};

const linebot = require('linebot');
const bot = linebot(_channel);

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const parser = bodyParser.json({
  verify: function (req, res, buf, encoding) {
    req.rawBody = buf.toString(encoding);
  }
});

app.post('/', parser, function (req, res) {
  if (!bot.verify(req.rawBody, req.get('X-Line-Signature'))) {
    return res.sendStatus(400);
  }
  bot.parse(req.body);
  return res.json({});
});

bot.on('message', function (event) {
  //console.log(event.message.text);
  
  event.reply({ type: 'text', text: run(event.message.text) });
});

app.listen(process.env.PORT, function () {
  console.log('LineBot is running on port '+process.env.PORT);
});

/******************************************/

require('./game')();