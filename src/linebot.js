require('dotenv').config();
const bg_channel={
	channelId: process.env.BG_CHANNEL_ID,
	channelSecret: process.env.BG_CHANNEL_SECRET,
	channelAccessToken: process.env.BG_CHANNEL_ACCESS_TOKEN
};

const linebot = require('linebot');
const bot = linebot(bg_channel);

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const parser = bodyParser.json({
  verify: function (req, res, buf, encoding) {
    req.rawBody = buf.toString(encoding);
  }
});

app.post('/LINEBOT_BGCERT', parser, function (req, res) {
  if (!bot.verify(req.rawBody, req.get('X-Line-Signature'))) {
    return res.sendStatus(400);
  }
  bot.parse(req.body);
  return res.json({});
});

bot.on('message', function (event) {
  //console.log(event.message.text);
  event.reply({ type: 'text', text: 'Hello, world' });
});

app.listen(process.env.PORT, function () {
  console.log('LineBot is running.');
});