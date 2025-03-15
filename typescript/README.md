# jp-wrap TypeScript版

日本語の禁則処理に対応したword-wrap

## インストール

```
npm install jp-wrap
```

## 使い方

```typescript
import jpWrap from 'jp-wrap';

// 幅10で折り返し
const wrap = jpWrap(10);
console.log(wrap('あいうえおかきくけこさしすせそ'));
// => あいうえお
//    かきくけこ
//    さしすせそ

// 幅10、左右に2文字分のpaddingをつける
const wrap2 = jpWrap(2, 10);
console.log(wrap2('あいうえおかきくけこさしすせそ'));
// =>   あいうえ
//        お
//      かきくけ
//        こ
//      さしすせ
//        そ

// オプション指定
const wrap3 = jpWrap(10, { trim: true, breakAll: false });
console.log(wrap3('あいうえお\nかきくけこ'));
// => あいうえおかきくけこ
```

## 開発

```
# インストール
npm install

# テスト実行
npm test

# ビルド
npm run build
```

## ライセンス

MIT
