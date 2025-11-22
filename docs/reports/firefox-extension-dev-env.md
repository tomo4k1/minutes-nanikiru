# Firefox拡張機能 開発環境調査レポート

## 1. Firefox拡張機能は自作できる？
**できます！** 🙆‍♀️
Chrome拡張機能と同様に、HTML/CSS/JavaScript で作成可能です。
また、作った拡張機能は公式ストア (AMO) に公開しなくても、**自己署名** して配布（Self-hosting）することも可能です。
※ ただし、未署名のまま一般利用するのは難しく（Developer Editionなどが必要）、基本的には Mozilla の署名プロセス（審査なしの署名のみも可）を通すのが一般的です。

---

## 2. 開発環境はどうする？

### 推奨ツール: **WXT** (再び登場！)
Chrome 編でも紹介した **WXT** は、Firefox にも完全対応しています。
これを使うのが一番ラクで現代的です。

*   **メリット**:
    *   `chrome` vs `browser` 名前空間の違いを吸収してくれる。
    *   Manifest V2 / V3 の切り替えや、Firefox 固有の設定（`specific_settings`）も設定ファイルで管理しやすい。
    *   ビルド時に Chrome 用と Firefox 用の zip を同時に生成できる。

### 公式ツール: **web-ext**
Mozilla 公式の CLI ツールです。
*   `web-ext run`: Firefox を立ち上げて拡張機能を読み込む。
*   `web-ext lint`: コードのチェック。
*   `web-ext build`: パッケージング。
WXT を使わない場合は、これが必須ツールになります。

---

## 3. Chrome拡張機能 (MV3) との違い ⚡️

ここが超重要！Chrome の Manifest V3 (MV3) とは、**「同じ MV3 でも中身が結構違う」** です。
Firefox の方が開発者に優しく、自由度が高いです。

| 機能 | Chrome (MV3) | Firefox (MV3) | ギャル的解説 💖 |
| :--- | :--- | :--- | :--- |
| **Web Request API** | ❌ 制限あり (declarativeNetRequest 強制) | ✅ **フル機能使える** (blockingWebRequest 維持) | 広告ブロックとか高度な通信制御作りたいなら Firefox しか勝たん！ |
| **Background Scripts** | Service Worker のみ (常駐不可) | **Event Pages** (非永続) も **Service Worker** も両方OK | Firefox は DOM API が使える Event Pages が選べるのが神。SW の制限に苦しまなくていい！ |
| **Manifest V2** | 廃止予定 (2025年中) | **サポート継続** (廃止予定なし) | Firefox は古い資産も大切にしてくれる優しさがある🥺 |
| **API Namespace** | `chrome.*` (Callback/Promise) | `browser.*` (Promise) | `browser` は `await` で書けるから書きやすい。WXT なら気にしなくてOK。 |

### 結論
*   **Chrome と同じものを作りたい**: WXT でクロスブラウザビルドすればOK。
*   **Chrome で制限されてる機能（強力な広告ブロックなど）を作りたい**: Firefox 専用として、`blockingWebRequest` などをフル活用できる！

---

## 4. まとめ
Firefox は Chrome の MV3 のセキュリティ向上を取り入れつつ、**「開発者の自由度」を守る** 方針をとっています。
特に **Background Script で DOM が触れる（Event Pages が使える）** 点と、**通信のブロッキングが自由にできる** 点は、開発者にとってめちゃくちゃデカいメリットです！

とりあえず **WXT** で始めれば、どっちにも対応できるので最強です✨
