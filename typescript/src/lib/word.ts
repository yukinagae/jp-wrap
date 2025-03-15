/**
 * 文字 str とその幅 width を持つオブジェクト
 *
 * @class Word
 * @module jp-wrap
 */
export interface WordOptions {
  sameWidth?: boolean;
  regexs?: RegexInfo[];
}

export interface RegexInfo {
  pattern: RegExp;
  width: number;
}

export class Word {
  str: string;
  width: number;
  isAlphaNumeric: boolean;
  lbStr: string | null;
  sameWidth: boolean;
  regexs: RegexInfo[];

  /**
   * ASCII文字と半角カタカナにマッチする正規表現
   *
   * @property {RegExp} halfWidthRegex
   * @private
   * @static
   */
  static halfWidthRegex = new RegExp('[ -~\uFF61-\uFF64\uFF65-\uFF9F]');

  /**
   * @constructor
   * @param {String} str
   * @param {Boolean} [options.sameWidth] 全角文字と半角文字の幅を両方とも2として計算する
   * @param {Object} [options.regexs] 幅の計算方法を正規表現で指定する
   */
  constructor(str: string = '', options: WordOptions = {}) {
    this.str = str;
    this.sameWidth = !!options.sameWidth;
    this.regexs = options.regexs || [];
    this.width = Word.widthByStr(this.str, {
      sameWidth: this.sameWidth,
      regexs: this.regexs
    });
    this.isAlphaNumeric = !!(this.str.match(/\w$/));
    this.lbStr = null;
  }

  /**
   * 最後の文字を取得
   *
   * @method last
   * @return {String} lastChar
   */
  last(): string | undefined {
    return this.str[this.str.length - 1];
  }

  /**
   * 頭のスペースを取り除く 全角文字も取り除く場合は第1引数をtrueに
   *
   * @method ltrim
   * @param {Boolean} fullWidths 全角スペースも取り除く
   * @return {Word} this
   */
  ltrim(fullWidthSpace: boolean = false): Word {
    const regex = fullWidthSpace ? /^([\s\u3000]+)/ : /^( +)/;
    const matched = this.str.match(regex);
    
    if (matched) {
      this.str = this.str.slice(matched[1].length);
      this.width -= Word.widthByStr(matched[1], {
        sameWidth: this.sameWidth,
        regexs: this.regexs
      });
    }
    
    return this;
  }

  /**
   * 与えられたWordを末尾に追加
   *
   * @method append
   * @public
   * @param {Word} word
   * @return {Word} this
   */
  append(word: Word): Word {
    if (this.hasLineBreak()) {
      throw new Error('hasLineBreak');
    }
    
    this.str += word.str;
    this.width += word.width;
    this.isAlphaNumeric = word.isAlphaNumeric;
    this.lbStr = word.lbStr;
    
    return this;
  }

  /**
   * 与えられた文字列を末尾に追加
   *
   * @method append
   * @public
   * @param {String} str
   * @return {Word} this
   */
  appendText(str: string): Word {
    return this.append(new Word(str));
  }

  /**
   * 改行文字を末尾に追加
   *
   * @method appendLineBreak
   * @return {Word} this
   */
  appendLineBreak(lbStr: string): Word {
    this.lbStr = lbStr;
    this.isAlphaNumeric = false;
    
    return this;
  }

  /**
   * 文字を含むかどうか
   *
   * @method hasStr
   * @public
   * @return {Boolean}
   */
  hasStr(): boolean {
    return this.str.length > 0;
  }

  /**
   * 改行文字を(末尾に)含むかどうか
   *
   * @method hasLineBreak
   * @public
   * @return {Boolean}
   */
  hasLineBreak(): boolean {
    return this.lbStr !== null;
  }

  /**
   * 文字列の幅を計算
   * 現時点ではASCIIおよび半角カタカナ以外の半角は認識できない
   * 全角文字と半角文字の幅を両方とも2として計算する場合はsameWidthオプションをtrueに
   * 正規表現で指定した文字の幅を指定して計算する場合はregexsオプションにpatternとwidthを持ったオブジェクトの配列を渡す
   *
   * @method widthByStr
   * @private
   * @static
   */
  static widthByStr(str: string = '', options: WordOptions = {}): number {
    const sameWidth = !!options.sameWidth;
    const regexs = options.regexs || [];
    
    if (sameWidth) {
      return str.length * 2;
    } else if (Array.isArray(regexs) && regexs.length > 0) {
      let length = 0;
      
      for (const c of str) {
        let matched = false;
        
        for (const regexInfo of regexs) {
          if (c.match(regexInfo.pattern)) {
            length += regexInfo.width;
            matched = true;
            break;
          }
        }
        
        if (!matched) {
          length += 2;
        }
      }
      
      return length;
    } else {
      const fullWidths = str.split('').filter(c => !c.match(this.halfWidthRegex)).length;
      return fullWidths + str.length;
    }
  }
}

export default Word;
