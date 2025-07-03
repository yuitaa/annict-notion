# annict-notion
## 概要
**annict-notion** は、アニメ視聴管理サービス [Annict](https://annict.com/) の「見てる」「見た」アニメ情報を Notion データベースへ自動同期する Node.js スクリプトです。

## セットアップ手順
1. **Notion データベースの作成**

   以下のプロパティを持つ必要があります。
   | プロパティ名 | 種類              |
   | ------------ | ----------------- |
   | タイトル     | テキスト          |
   | シーズン     | 選択              |
   | メディア     | 選択              |
   | ステータス   | 選択              |
   | 公式サイト   | URL               |
   | 公式Twitter  | URL               |
   | id           | 数値              |
   | 画像         | ファイル&メディア |

2. **リポジトリのクローン**
   ```sh
   git clone https://github.com/yuitaa/annict-notion
   cd annict-notion
   ```

3. **依存パッケージのインストール**
   ```sh
   npm install
   ```

4. **環境変数ファイルの作成**
   プロジェクトルートに `.env` ファイルを作成し、以下の内容を記載してください。
   ```
   ANNICT_TOKEN=Annictアクセストークン
   NOTION_TOKEN=Notionトークン
   NOTION_DB_ID=NotionデータベースID
   ```

## 使用方法
### 手動実行
Node.js でスクリプトを実行します。

```sh
node src/main.js
```

- Annict API から「見てる」「見た」アニメを取得し、Notion データベースに同期します。
- 同期結果は `data/data.json` に保存されます（Notion ページIDやステータスの管理）。

### GitHub Actions での自動実行
`.github/workflows/sync.yml` により、毎日自動で同期処理が実行されます。
（GitHub Actions の Secrets に `.env` の内容を設定してください）

## ライセンス
このプロジェクトは [MIT License](LICENCE) のもとで公開されています。