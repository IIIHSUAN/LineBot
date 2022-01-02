# LineBot -- 21點
計算理論期末 Project

## 遊戲規則
使用者為玩家，與莊家(伺服器)進行1對1 21點遊戲

### 簡易規則
1. 目標: 手牌點數越接近21點者勝，若一方超過則判輸，若兩方均超過則莊家輸 (莊家先兌)
2. 猜大小: 玩家決定是否加牌
3. 結算時機: 玩家決定抽牌與否後，輪到莊家決定是否抽牌，若是則回到2，若否則結束遊戲並結算
4. 點數計算: 數字牌點數與其數字相同，A 可選擇為1或11，其餘 J, Q, K 為10

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

結果圖 (存放於 smcat/result.svg)

![alt text](https://github.com/IIIHSUAN/LineBot/blob/main/smcat/result.svg?raw=true)

## 執行結果

![alt text](https://i.imgur.com/UMHXKVg_d.webp?maxwidth=760&fidelity=grand)
