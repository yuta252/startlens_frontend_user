# Startlens


![startlens_preview1](https://user-images.githubusercontent.com/42575165/106087559-9ab4d480-6167-11eb-83ae-187404a3cdb3.png)
![startlens_preview2](https://user-images.githubusercontent.com/42575165/106087567-9d172e80-6167-11eb-97b5-3d4075d9ff23.png)


## サイト概要

観光地の情報を検索して写真の閲覧やレビュー評価を投稿できるサイトです。
[バックエンドAPIレポジトリ](https://github.com/yuta252/startlens_web_backend)
[管理者側ページレポジトリ](https://github.com/yuta252/startlens_react_frontend)

## 技術選定

- React.js    v16.14.0
- Redux       v7.2.2
- TypeScript  v3.9.7
- Material UI

## 機能

- 複数の検索条件（観光事業者名、場所、カテゴリー、表示数）のクエリを生成し検索
- react-intlを利用したi18n国際化対応（※現時点で日本語と英語のみ対応）
- JWTトークンによる認証機能
- GoogleMapAPIによる位置情報のマップ表示
- お気に入り登録
- レビュー、評価の投稿
- 観光のページ訪問時のログ収集とサーバーへの非同期通信
- ユーザーサムネイル画像のリサイズとBase64エンコーディングし画像をS3へアップロード


## 使用素材

- [Unsplash](https://unsplash.com/)
