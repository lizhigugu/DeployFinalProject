[111-1] Web Programming Final

# 專題題目名稱：(Group 60)會賺錢的-時間管理大師-購物網站實作

Demo 影片連結：

Deploy 連結：

服務簡介：

    - 結合個人需求設計的購物網站，具有基礎但完整的購物網站功能。
    - 買家可利用LINE登入進行商品購買，賣家獲得User的LineID可於官方帳號傳送特定商品進度資訊的通知給買家。
    - 賣家於登入網站後可輕鬆上架商品以及對商品與訂單進行分類。

使用與參考之框架/模組/原始碼：

    主要使用：
    - mui：前端 UI design
    - WebSocket：前端與後端之間的資料溝通
    - request / cheerio / axios：整合外部網站資訊（Line Login Access 和 7-11 門市）回傳至網站後端供買家登入及購買時使用
    詳細：
    - frontend：mui, react, react-router-dom
    - backend：websocket, axios, request, jwt-decode, cheerio, mongoose, express
    - database：mongodb

使用之第三方套件、框架、程式碼：
    - 框架：mui 
    - Line Login API連結：買家帳號之登入服務
    - cheerio / request：7-11門市資訊爬蟲

專題製作心得：

    B10901111 廖子緹：

    跟組員一起做專題的過程中，很深刻的體驗到自己在這堂課上所掌握的還有許多不足。所幸我的組員對我非常包容，也很高興一邊做專題，我也一邊學會一些剛開始並沒有懂的架構跟概念。雖然距離精熟應該還有很長遠的路要走，但是很高興能感覺到自己已經在路上了。也很感謝我的組員願意包容這樣不足的我。

    B10901121 張譯心：

    這次期末體驗到從頭設計到製作一個全端的網頁真的比想像中的困難很多，在思考後端資料儲存和上傳架構時，原本以為用類似Chatroom作業的websocket傳輸架構就好，結果越寫到後來越覺得自己在手刻graphql 🥲 然後最後還有很多沒有考慮到的、需要拿取或者更新資料的狀況，沒有把各種function寫好，超級感謝組員幫我把它們修好。寫期末專題的時候順便複習了這學期原本沒想到自己真的能學起來的東西，也體會到設計東西的時候需要思考得更完善。

    B10901099 郭芊彤：

# 如何在 localhost 安裝與測試之詳細步驟

1. 前端安裝：

    cd frontend/
    yarn 

2. 後端安裝

    cd backend/
    yarn

    如果發現沒有 package.json 使用下面的code
    cd backend/
    yarn init -y
    yarn add cors dotenv express mongoose nodemon ws dotenv-defaults @babel/cli @babel/core @babel/node @babel/preset-env
    yarn add request cheerio axios
    然後在package.json新增下列code：
    "scripts": {
        "server": "nodemon server.js --ext js --exec babel-node",
        "deploy": "NODE_ENV=production babel-node server.js"
    }
    
3. 注意事項！！！！！！！

    由於此網站有和 Line 進行連動，內部參數有部分已先設為定數設於程式中，請勿嘗試更動，會導致 Line 無法 login
    - 在 frontend/src/containers/Login.js 中，請確認 67 行程式中的 redirect_uri = https://localhost:3000/login
    - 在 backend/src/functions/LineLogin.js 中，請確認 13 行程式中的 redirect_uri: 'https://localhost:3000/login',
    - 由於這個需要 Line 管理者那邊的權限所以不要亂玩，謝謝！

4. 設置 backend/.env

    請在 backend 底下設置 .env
    內容： MONGO_URl = 你的 mongodb 連結

5. 啟動（請使用兩個cmd）

    開啟前端：
    cd frontend/
    yarn start

    開啟後端：
    cd backend/
    yarn server

# 測試

- 可以自由在網站上遊玩或是參考影片進行測試
- 請加入商品網址時，要點選要使用的圖片複製圖片位址
- 若要測試管理者介面：
    使用者名稱：Cs
    使用者ID：B10901099
    然後點選「登入 / 註冊」按鈕

# 組員負責項目

廖子緹：7-11門市資訊爬蟲、前端網站架設、整體網站發想

張譯心：後端網站架設、前後端連動、DataBase設計

郭芊彤：前端網站架設、前後端連動、Line Login