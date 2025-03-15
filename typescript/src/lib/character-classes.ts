// W3C - Requirements for Japanese Text Layout
// Appendix A Character Classes
// http://www.w3.org/TR/jlreq/#character_classes
export interface CharacterClasses {
  [key: string]: string | string[];
}

const characterClasses: CharacterClasses = {
  // A.1 Opening brackets (cl-01)
  // Basic Latin -> Halfwidth and Fullwidth Forms
  "Opening brackets": "'\"\uFF08\u3014\uFF3B\uFF5B\u3008\u300A\u300C\u300E\u3010\uFF5F\u3018\u3016\u00AB\u301D\uFF1C",
  // add "<" (U+003C LESS-THAN SIGN SIGN)
  "Opening brackets ASCII": "([{<",
  "Opening brackets HANKAKU": "\uFF62",

  // A.2 Closing brackets (cl-02)
  // Basic Latin -> Halfwidth and Fullwidth Forms
  "Closing brackets": "'\"\uFF09\u3015\uFF3D\uFF5D\u3009\u300B\u300D\u300F\u3011\uFF60\u3019\u3017\u00BB\u301F\uFF1E",
  // add ">" (U+003E GREATER-THAN)
  "Closing brackets ASCII": ")]}>" ,
  "Closing brackets HANKAKU": "\uFF63",

  // A.3 Hyphens (cl-03)
  // U+2010, U+301C, U+30A0, U+2013
  // add "－" (U+FF0D FULLWIDTH HYPHEN-MINUS), "～" (U+FF5E FULLWIDTH TILDE)
  "Hyphens": "\u2010\u301C\u30A0\u2013\uFF0D\uFF5E",
  // add "-" (U+002D HYPHEN-MINUS), "~" (U+̃007E TILDE)
  "Hyphens ASCII": "-~",

  // A.4 Dividing punctuation marks (cl-04)
  // Basic Latin -> Halfwidth and Fullwidth Forms
  "Dividing punctuation marks": "\uFF01\uFF1F\u203C\u2047\u2048\u2049",
  "Dividing punctuation marks ASCII": "!?",

  // A.5 Middle dots (cl-05)
  // Basic Latin -> Halfwidth and Fullwidth Forms
  // TODO: Disscuss "·" (U+00B7 MIDDLE DOT)
  "Middle dots": "\u30FB\uFF1A\uFF1B",
  "Middle dots ASCII": ":;",
  "Middle dots HANKAKU": "\uFF65",
  // A.6 Full stops (cl-06)
  "Full stops": "\u3002\uFF0E",
  "Full stops ASCII": ".",
  "Full stops HANKAKU": "\uFF61",
  // A.7 Commas (cl-07)
  "Commas": "\u3001\uFF0C",
  "Commas ASCII": ",",
  "Commas HANKAKU": "\uFF64",
  // A.8 Inseparable characters (cl-08)
  // "—" (U+2014) is EM DASH, is not HYPHEN-MINUS(ASCII)
  // add "―" (U+2015 HORIZONTAL BAR)
  "Inseparable characters": "\u2014\u2015\u2026\u2025",
  "Inseparable characters sets": ["\u3033\u3035", "\u3034\u3035"], // Array
  // A.9 Iteration marks (cl-09)
  "Iteration marks": "\u30FD\u30FE\u309D\u309E\u3005\u303B",
  // A.10 Prolonged sound mark (cl-10)
  "Prolonged sound mark": "\u30FC",
  "Prolonged sound mark HANKAKU": "\uFF70",
  // A.11 Small kana (cl-11)
  // Not include "ㇷ゚" (U+31F7, U+309A)
  "Small kana": "\u3041\u3043\u3045\u3047\u3049\u30A1\u30A3\u30A5\u30A7\u30A9\u3063\u3083\u3085\u3087\u308E\u3095\u3096\u30C3\u30E3\u30E5\u30E7\u30EE\u30F5\u30F6\u31F0\u31F1\u31F2\u31F3\u31F4\u31F5\u31F6\u31F7\u31F8\u31F9\u31FA\u31FB\u31FC\u31FD\u31FE\u31FF",
  "Small kana HANKAKU": "\uFF67\uFF68\uFF69\uFF6A\uFF6B\uFF6C\uFF6D\uFF6E\uFF6F",
  // A.12 Prefixed abbreviations (cl-12)
  // Basic Latin -> Halfwidth and Fullwidth Forms
  // "¥" (U+00A5) is YEN SIGN, is not REVERSE SOLIDUS(ASCII)
  // add "¤" (U+00A4) CURRENCY SIGN
  // add "₩" (U+20A9) WON SIGN
  // add FULLWIDTH ￡￥￦
  "Prefixed abbreviations": "\u00A5\uFF04\u00A3\u20AC\u00A4\u20A9\uFFE1\uFFE5\uFFE6" + "\u2116\uFF03",
  "Prefixed abbreviations ASCII": "\\$" + "#",
  // KANJI
  // TODO: add...
  "Prefixed abbreviations KANJI": "",
  // A.13 Postfixed abbreviations (cl-13)
  // Basic Latin -> Halfwidth and Fullwidth Forms
  // "°" (U+00B0 DEGREE SIGN) is not KATKANAｰHIRAGAN SEMI-VOICED SOUND MARK
  // add ‱℉ℊΩKÅ
  // add ¢ (U+00A2 CENT SIGN)
  // add ￠(U+FFE0 FULLWIDTH CENT SIGN)
  // add U+3300-U+3357 U+3371-U+337A U+3380-U+33DF CJK Compatibility SQURE *
  //   inculde "㏋㌃㌍㌔㌘㌢㌣㌦㌧㌫㌶㌻㍉㍊㍍㍑㍗㎎㎏㎜㎝㎞㎡㏄"
  "Postfixed abbreviations": "\u00B0\u2032\u2033\u2103\uFF05\u2030\u2031\u2113\u2109\u210A\u03A9K\u00C5" +
      "\\u3300-\\u3377\\u3371-\\u337A\\u3380-\\u33DF" +
      "\u00A2\uFFE0",
  "Postfixed abbreviations ASCII": "%", // %
  // KANJI
  // TODO: add...
  "Postfixed abbreviations KANJI": "",

  // A.14 Full-width ideographic space (cl-14)
  "Full-width ideographic space": "\u3000", // U+3000

  // A.15 Hiragana (cl-15)
  // add small kana
  // not include combine
  "Hiragana": "\\u3041-\\u3096",

  // A.16 Katakana (cl-16)
  // add small kana
  // not include combine
  "Katakana": "\\u30A1-\\u30FA",

  // A.18 Math operators (cl-18)
  // Basic Latin -> Halfwidth and Fullwidth Forms
  // add MINUS-HYPHEN
  "Math symbols": "\uFF0B\u2212\u00D7\u00F7\u00B1\u2213\uFF0D",
  "Math symbols ASCII": "+-",

  // A.19 Ideographic characters (cl-19)
  // TODO: all KANJI?
  // A.20 Characters as reference marks (cl-20)
  // A.21 Ornamented character complexes (cl-21)
  // A.22 Simple-ruby character complexes (cl-22)
  // A.23 Jukugo-ruby character complexes (cl-23)

  // A.24 Grouped numerals (cl-24)
  // Basic Latin -> Halfwidth and Fullwidth Forms
  "Grouped numerals": "\u3000\uFF0C\uFF0E\uFF10\uFF11\uFF12\uFF13\uFF14\uFF15\uFF16\uFF17\uFF18\uFF19",
  "Grouped numerals ASCII": " ,.0123456789",

  // A.25 Unit symbols (cl-25)
  // Basic Latin -> Halfwidth and Fullwidth Forms
  "Unit symbols": "\u3000\uFF08\uFF09\uFF0F\uFF11\u2212\uFF14\uFF21-\uFF3A\uFF41-\uFF5A\u03A9\u03BC\u2127\u00C5\u2212\u30FB",
  "Unit symbols ASCII": " ()/1234" +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "abcdefghijklmnopqrstuvwxyz",

  // A.26 Western word space (cl-26)
  "Western word space": "\\u0020",

  // A.27 Western characters (cl-27)
  // TODO: add over U+2000 chars and FULLWIDTH
  "Western characters": "\\u0021-\\u007E\\u00A0-\\u1FFF",

  // A.28 Warichu opening brackets (cl-28)
  // Basic Latin -> Halfwidth and Fullwidth Forms
  "Warichu opening brackets": "\uFF08\u3014\uFF3B",
  "Warichu opening brackets ASCII": "([",

  // A.29 Warichu closing brackets (cl-29)
  // Basic Latin -> Halfwidth and Fullwidth Forms
  "Warichu closing brackets": "\uFF09\u3015\uFF3D",
  "Warichu closing brackets ASCII": ")]",

  // A.30 Characters in tate-chu-yoko (cl-30)
};

export default characterClasses;
