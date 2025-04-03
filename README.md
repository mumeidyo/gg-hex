# GameGuardian用カスタムスクリプト生成機

このアプリケーションは、チートツールのGGで使用するLuaスクリプトを簡単に生成するためのウェブアプリケーションです。HEXコードの検索と置換機能を持つスクリプトを、プログラミングの知識がなくても簡単に作成できます。
## 機能

- 作者名とスクリプト関数名の設定
- HEXコードの検索値と置換値の指定
- 複数の機能を持つスクリプトの作成
- 生成したスクリプトの.luaファイルとしてのエクスポート
- GameGuardian APIの自動組み込み（gg.searchNumber、gg.toast等）

## インストール方法

このプロジェクトをローカルで実行するには以下の手順に従ってください：

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/gameguardian-script-generator.git
cd gameguardian-script-generator

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## デプロイ方法

このアプリケーションは[Render](https://render.com/)にデプロイできるように設定されています。

1. Renderアカウントを作成する
2. 「New Web Service」を選択
3. このGitリポジトリを連携
4. 以下の設定を確認：
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. 「Create Web Service」をクリック

## 使用方法

1. 作者名を入力します（例：「わたる」）
2. 機能名を入力します（例：「HP無限化」）
3. 検索したいHEXコード（変更前の値）を入力します
4. 置換したいHEXコード（変更後の値）を入力します
5. 「機能を追加」ボタンをクリックして機能を追加します
6. 複数の機能を追加する場合は、手順2〜5を繰り返します
7. 全ての機能を追加したら「完了」ボタンをクリックします
8. 生成されたスクリプトをダウンロードして、GameGuardianで使用します

## 開発環境

- Node.js (v20以上)
- Express.js (バックエンド)
- React + Vite (フロントエンド)
- TypeScript
- Tailwind CSS + shadcn/ui

## ライセンス

MIT

## サポート

問題や質問がある場合は、Issueを作成してください。
