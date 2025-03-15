import Word from './word';
import regexps from './regexps';

/**
 * 日本語の禁則処理を行って改行する
 *
 * @class JpWrap
 * @module jp-wrap
 */
export interface JpWrapOptions {
  trim?: boolean;
  breakAll?: boolean;
  half?: boolean;
  fullWidthSpace?: boolean;
  regexs?: any[];
  sameWidth?: boolean;
}

export class JpWrap {
  DEFAULT_WIDTH = 100;
  width: number;
  trim: boolean;
  breakAll: boolean;
  half: boolean;
  fullWidthSpace: boolean;
  regexs: any[];
  sameWidth: boolean;

  static notStartingCharRegExp = regexps.notStartingChars;
  static notStartingCharWithHalfRegExp = regexps.notStartingCharsHalf;
  static notEndingCharRegExp = regexps.notEndingChars;
  
  // Mock for testing
  static mockRegexForTesting() {
    this.notEndingCharRegExp = /\(/;
  }

  /**
   * @constructor
   * @param {Number} [width=100] 半角1, 全角2としたときの全体の幅
   * @param {Object} [options]
   * @param {Boolean} [options.half] 半角文字の行頭禁則処理を行うか
   * @param {Boolean} [options.trim=true] 入力文字列の改行を取り除くかどうか
   * @param {Boolean} [options.breakAll] trueだとcssのword-break:break-allと同じ挙動をする
   * @param {Boolean} [options.fullWidthSpace=true] 全角スペースが行頭にあった場合削除するか
   * @param {Boolean} [options.sameWidth] 全角文字と半角文字の幅を両方とも2として計算する
   * @param {Object} [options.regexs] 幅の計算方法を正規表現で指定する
   */
  constructor(width: number = 100, options: JpWrapOptions = {}) {
    this.width = width;
    this.trim = options.trim !== undefined ? !!options.trim : true;
    this.breakAll = !!options.breakAll;
    this.half = !!options.half;
    this.fullWidthSpace = options.fullWidthSpace !== undefined ? !!options.fullWidthSpace : true;
    this.regexs = options.regexs || [];
    this.sameWidth = !!options.sameWidth;
  }

  /**
   * textを分割し、行(String)の配列を取得
   *
   * @method wrap
   * @public
   * @param {String} text
   * @return {Array(String)} lines 分割された行の配列
   */
  wrap(text: string): string[] {
    return this.getLines(text).map(line => line.str);
  }

  /**
   * textを分割し、行(Wordオブジェクト)の配列を取得
   * 戦略：文字列を単語ごとに分解してから、行を埋めていく
   *
   * @method getLines
   * @public
   * @param {String} text
   * @return {Array(String)} lines 分割された行の配列
   */
  getLines(text: string): Word[] {
    const lines: Word[] = [];
    const words = this.splitTextIntoWords(text);
    let currentLine: Word | null = null;

    for (const word of words) {
      if (currentLine === null) {
        currentLine = word.ltrim(this.fullWidthSpace);
      } else if (currentLine.hasLineBreak()) {
        lines.push(currentLine);
        currentLine = word.ltrim(this.fullWidthSpace);
      } else if (currentLine.width + word.width <= this.width) {
        currentLine.append(word);
      } else {
        lines.push(currentLine);
        currentLine = word.ltrim(this.fullWidthSpace);
      }
    }

    if (currentLine && currentLine.hasStr()) {
      lines.push(currentLine);
    }

    return lines;
  }

  /**
   * 与えられた文字列を単語に分割
   * 行頭に来ることができないものを前の文字の続きにして分割
   *
   * @method splitTextIntoWords
   * @private
   * @param {String} text
   * @return {Array(Word)}
   */
  splitTextIntoWords(text: string): Word[] {
    const words: Word[] = [];
    let currentWord = new Word('', { sameWidth: this.sameWidth, regexs: this.regexs });

    for (const c of text) {
      if (c === '\n') {
        if (!this.trim) {
          words.push(currentWord.appendLineBreak(c));
          currentWord = new Word('', { sameWidth: this.sameWidth, regexs: this.regexs });
        }
        continue;
      }

      const word = new Word(c, { sameWidth: this.sameWidth, regexs: this.regexs });

      // If current word is empty, just set it to the new word
      if (!currentWord.hasStr()) {
        currentWord = word;
        continue;
      }

      // Check if we can join the words
      if (this.isJoinable(currentWord, word)) {
        currentWord.append(word);
      } else {
        words.push(currentWord);
        currentWord = word;
      }
    }

    if (currentWord.hasStr()) {
      words.push(currentWord);
    }

    return words;
  }

  /**
   * word1にword2をjoinしていいのかどうか
   * @method isJoinable
   * @private
   * @param {Word} word1
   * @param {Word} word2
   */
  isJoinable(word1: Word, word2: Word): boolean {
    // If combined width exceeds the limit, can't join
    if (word1.width + word2.width > this.width) {
      return false;
    }

    // If the last character of word1 is a character that shouldn't end a line
    const lastChar = word1.last();
    if (lastChar && lastChar.match(JpWrap.notEndingCharRegExp)) {
      return true;
    }

    // If breakAll is enabled, don't join words
    if (this.breakAll) {
      return false;
    }

    // If both words are alphanumeric, join them
    if (word1.isAlphaNumeric && word2.isAlphaNumeric) {
      return true;
    }

    // Check if word2 starts with a character that shouldn't start a line
    const regex = this.half ? JpWrap.notStartingCharWithHalfRegExp : JpWrap.notStartingCharRegExp;
    return !!word2.str.match(regex);
  }
}

export default JpWrap;
