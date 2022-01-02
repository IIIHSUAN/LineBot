# LineBot -- 21點
計算理論期末 Project

## 遊戲規則
使用者為玩家，與莊家(伺服器)進行1對1 21點
(詳細規則請參閱 https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%8D%81%E4%B8%80%E9%BB%9E)

## 使用說明
開始: 輸入"start"
選擇加牌與否: 輸入"y"或"n"
重新開始: 一旦到了結算畫面，輸入"re"

## 執行伺服器
node.js command line 於根資料夾輸入
> npm run dev 或 npm run start

## 繪製FSM
套用模組 https://www.npmjs.com/package/state-machine-cat
執行 node.js command line 於根資料夾輸入
> smcat smcat/result.smcat

結果圖
![image] (https://raw.githubusercontent.com/IIIHSUAN/LineBot/f9f0e2f5c805cb1d324f22527e5149ab26943d04/smcat/result.svg)
