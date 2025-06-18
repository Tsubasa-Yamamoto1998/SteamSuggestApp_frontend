# Steam Suggest App

Steamアカウントと連携して、ユーザーが所有しているゲームライブラリを可視化し、プレイ時間統計やおすすめ動画を提示するWebアプリです。

---

## 🚀 デプロイ済みアプリ

- **フロントエンド**: [https://sg-app.jp](https://sg-app.jp)  
- **バックエンドAPI**: [https://api.sg-app.jp](https://api.sg-app.jp)

---

## 🛠 使用技術

### フロントエンド
- Vue.js 3![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
- Vite![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
- Pinia（状態管理）![Pinia](https://img.shields.io/badge/Pinia-FADA5E?style=for-the-badge&logo=pinia&logoColor=black)
- Axios（API通信）![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
- Tailwind CSS（スタイリング）![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)


### バックエンド
- Ruby on Rails 7
- PostgreSQL
- Devise + Devise Token Auth（トークン認証）

### インフラ・外部サービス
- Heroku（バックエンドAPIホスティング）
- Netlify（フロントエンドホスティング）
- Brevo（SMTPメール送信）
- Steam Web API（ゲームデータ取得）
- お名前.com（独自ドメイン取得・DNS設定）

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

