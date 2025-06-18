# Steam Suggest App

Steamアカウントと連携して、ユーザーが所有しているゲームライブラリを可視化し、プレイ時間統計やおすすめ動画を提示するWebアプリです。

---

## 🚀 デプロイ済みアプリ

- **フロントエンド**: [https://sg-app.jp](https://sg-app.jp)  
- **バックエンドAPI**: [https://api.sg-app.jp](https://api.sg-app.jp)

---

## 🛠 使用技術

### フロントエンド
- ![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
- ![Pinia](https://img.shields.io/badge/Pinia-FADA5E?style=for-the-badge&logo=pinia&logoColor=black)（状態管理）
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)（API通信）
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)


### バックエンド
- ![Ruby on Rails](https://img.shields.io/badge/Rails-CC0000?style=for-the-badge&logo=rubyonrails&logoColor=white)
- ![Httparty](https://img.shields.io/badge/Httparty-CC342D?style=for-the-badge&logo=ruby&logoColor=white)（API通信）
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
- Devise + Devise Token Auth（トークン認証）

### インフラ・外部サービス
- ![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)（バックエンドAPIホスティング）
- ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)（フロントエンドホスティング・DNS設定）
- ![Brevo](https://img.shields.io/badge/Brevo-00A884?style=for-the-badge&logo=maildotru&logoColor=white)（SMTPメール送信）
- ![Steam](https://img.shields.io/badge/Steam-000000?style=for-the-badge&logo=steam&logoColor=white)（APIでゲームデータ取得）
- ![YouTube](https://img.shields.io/badge/YouTube_API-FF0000?style=for-the-badge&logo=youtube&logoColor=white)（APIで動画データ取得）
- ![お名前.com](https://img.shields.io/badge/お名前.com-DD0031?style=for-the-badge&logo=internet-explorer&logoColor=white)（独自ドメイン取得）

---

## 📷 スクリーンショット

> ※任意の画像を `./images/` フォルダに配置し、下記パスを編集してください。

![ホーム画面](./images/home.png)
![ゲームライブラリ](./images/library.png)

---

## 📄 主な機能

- ユーザー登録・ログイン（メール認証付き）
- Steam ID 登録によるゲームライブラリ自動取得
- ゲームタイトル・ジャンルの表示
- ゲーム統計データの可視化
- モバイル対応UI

---

## 🔗 使用API

- **Steam Web API**  
  ユーザーが保有しているゲームのリストを取得

---

## 🧑‍💻 開発者

- tsubasa yamamoto  
- GitHub: [https://github.com/your-github-id](https://github.com/your-github-id)

---

## 📬 お問い合わせ

> このプロジェクトに関するご質問は GitHub Issues または開発者連絡先までお願いいたします。

