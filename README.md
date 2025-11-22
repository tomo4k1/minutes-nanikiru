# Minutes Nanikiru (分何切る) 🀄️

**Minutes Nanikiru** は、麻雀の牌効率（何切る）を練習するためのブラウザ拡張機能です。
ランダムに生成される手牌で何切る問題を解き、シャンテン数と受け入れ枚数（Ukeire）の計算に基づいた即時フィードバックでスキルを磨きましょう。

## ✨ 機能

*   **ランダム手牌生成**: 無限に生成される14枚の手牌で練習できます。
*   **リアルタイム計算**: `mahjong-tile-efficiency` を使用して、シャンテン数と受け入れ枚数を瞬時に計算します。
*   **スマートなフィードバック**:
    *   **正解**: 最善手（最も受け入れが広い打牌）を選べたか判定します。
    *   **不正解**: 選んだ打牌と最善手の受け入れ枚数・シャンテン数の差を表示します。
    *   **待ち牌リスト**: 具体的にどの牌を待っているか（例：「待ち: 1萬, 4萬」）を表示します。
*   **完全日本語化**: 麻雀用語（「東」「1萬」など）を使用した分かりやすいUIです。
*   **モダンなUI**: React と TailwindCSS で構築された、クリーンでレスポンシブなデザインです。

## 🛠️ 技術スタック

*   **フレームワーク**: [WXT (Web Extension Tools)](https://wxt.dev/)
*   **UIライブラリ**: [React](https://react.dev/)
*   **スタイリング**: [TailwindCSS](https://tailwindcss.com/)
*   **ロジック**: [`mahjong-tile-efficiency`](https://github.com/garyleung142857/mahjong-tile-efficiency)
*   **アセット**: [`@emeraldcoder/riichi-ui-css`](https://github.com/emeraldcoder/riichi-ui-css)

## 🚀 開発

### 前提条件

*   Node.js (v18+)
*   npm

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/tomo4k1/minutes-nanikiru.git
cd minutes-nanikiru

# 依存関係をインストール
npm install
```

### 開発サーバーの起動

HMR（ホットモジュールリプレースメント）付きの開発サーバーを起動します。自動的にブラウザが開き、拡張機能が読み込まれます。

```bash
npm run dev
```

### 本番用ビルド

Chrome (Manifest V3) および Firefox 向けの拡張機能をビルドします。

```bash
npm run build
```

出力は `.output/` ディレクトリに生成されます。

## 📝 ライセンス

MIT
