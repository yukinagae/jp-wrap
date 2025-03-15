import { JpWrap, JpWrapOptions } from './lib/jp-wrap';

/**
 * [substack/node-wordwrap](https://github.com/substack/node-wordwrap)とほぼ同じAPIに
 * https://github.com/substack/node-wordwrap/blob/master/LICENSE
 * copyright
 *
 * @param {Number} start 単独で指定した場合、文字列の幅。この場合第2引数がoptionsとして扱われる
 * @param {Number} [stop] 指定された場合、`stop - start`の幅で行い、左右にstartだけのpaddingをつける
 * @param {Object} [options]
 * @param {Boolean} [options.half] 半角文字の行頭禁則処理を行うか
 * @param {Boolean} [options.trim=false] 入力文字列の改行を取り除くかどうか
 * @param {Boolean} [options.breakAll] trueだとcssのword-break:break-allと同じ挙動をする
 * @param {Boolean} [options.fullWidthSpace=true] 全角スペースが行頭にあった場合削除するか
 * @param {Boolean} [options.sameWidth] 全角文字と半角文字の幅を両方とも2として計算する
 * @return {String} 整形された文字列
 */
function entry(start: number, stop?: number | JpWrapOptions, options: JpWrapOptions = {}): (text: string) => string {
  if (typeof stop === 'object') {
    options = stop;
    stop = undefined;
  }
  
  if (options.trim === undefined) {
    options.trim = false;
  }
  
  if (!stop) {
    const jpWrap = new JpWrap(start, options);
    return function(text: string): string {
      return jpWrap.wrap(text).join('\n');
    };
  }
  
  const jpWrap = new JpWrap(stop - start, options);
  const spaces = Array(stop + 1).fill(' ').join('');
  const spacesStart = spaces.slice(0, start);
  
  return function(text: string): string {
    const lines = jpWrap.getLines(text).map(line => {
      return spacesStart + line.str + spaces.slice(0, stop - line.width);
    });
    
    return lines.join('\n');
  };
}

// Add JpWrap class to exports
(entry as any).JpWrap = JpWrap;

// For CommonJS compatibility
export { JpWrap };

// Use default export for compatibility
export default entry;
