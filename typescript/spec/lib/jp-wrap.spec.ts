import { expect } from 'chai';
import { JpWrap } from '../../src/lib/jp-wrap';

describe('JpWrap', () => {
  describe('constructor', () => {
    it('creates a JpWrap with default options', () => {
      const jpWrap = new JpWrap();
      expect(jpWrap.width).to.equal(100);
      expect(jpWrap.trim).to.equal(true);
      expect(jpWrap.breakAll).to.equal(false);
      expect(jpWrap.half).to.equal(false);
      expect(jpWrap.fullWidthSpace).to.equal(true);
      expect(jpWrap.regexs).to.deep.equal([]);
      expect(jpWrap.sameWidth).to.equal(false);
    });

    it('creates a JpWrap with custom width', () => {
      const jpWrap = new JpWrap(50);
      expect(jpWrap.width).to.equal(50);
    });

    it('creates a JpWrap with custom options', () => {
      const jpWrap = new JpWrap(50, {
        trim: false,
        breakAll: true,
        half: true,
        fullWidthSpace: false,
        sameWidth: true,
        regexs: [{ pattern: /a/, width: 3 }]
      });
      expect(jpWrap.width).to.equal(50);
      expect(jpWrap.trim).to.equal(false);
      expect(jpWrap.breakAll).to.equal(true);
      expect(jpWrap.half).to.equal(true);
      expect(jpWrap.fullWidthSpace).to.equal(false);
      expect(jpWrap.regexs).to.deep.equal([{ pattern: /a/, width: 3 }]);
      expect(jpWrap.sameWidth).to.equal(true);
    });
  });

  describe('wrap', () => {
    it('wraps text with default options', () => {
      const jpWrap = new JpWrap(10);
      const result = jpWrap.wrap('abcdefghijklmnopqrstuvwxyz');
      expect(result).to.deep.equal(['abcdefghij', 'klmnopqrst', 'uvwxyz']);
    });

    it('wraps Japanese text', () => {
      const jpWrap = new JpWrap(10);
      const result = jpWrap.wrap('あいうえおかきくけこさしすせそ');
      expect(result).to.deep.equal(['あいうえお', 'かきくけこ', 'さしすせそ']);
    });

    it('wraps mixed text', () => {
      const jpWrap = new JpWrap(10);
      const result = jpWrap.wrap('あいうabcdefgh');
      expect(result).to.deep.equal(['あいう', 'abcdefgh']);
    });

    it('respects line breaks when trim is false', () => {
      const jpWrap = new JpWrap(10, { trim: false });
      const result = jpWrap.wrap('abc\ndef\nghi');
      expect(result).to.deep.equal(['abc', 'def', 'ghi']);
    });

    it('removes line breaks when trim is true', () => {
      const jpWrap = new JpWrap(10, { trim: true });
      const result = jpWrap.wrap('abc\ndef\nghi');
      expect(result).to.deep.equal(['abcdefghi']);
    });

    it('breaks all characters when breakAll is true', () => {
      const jpWrap = new JpWrap(5, { breakAll: true });
      const result = jpWrap.wrap('abcdefghij');
      expect(result).to.deep.equal(['abcde', 'fghij']);
    });

    it('handles half-width characters when half is true', () => {
      const jpWrap = new JpWrap(10, { half: true });
      const result = jpWrap.wrap('あいうえお)かきくけこ');
      expect(result).to.deep.equal(['あいうえお', ')かきくけ', 'こ']);
    });

    it('removes full-width spaces at line start when fullWidthSpace is true', () => {
      const jpWrap = new JpWrap(10, { fullWidthSpace: true });
      const result = jpWrap.wrap('　あいうえおかきくけこ');
      expect(result).to.deep.equal(['あいうえお', 'かきくけこ']);
    });

    it('keeps full-width spaces at line start when fullWidthSpace is false', () => {
      const jpWrap = new JpWrap(10, { fullWidthSpace: false });
      const result = jpWrap.wrap('　あいうえおかきくけこ');
      expect(result).to.deep.equal(['　あいうえ', 'おかきくけ', 'こ']);
    });

    it('treats all characters as same width when sameWidth is true', () => {
      const jpWrap = new JpWrap(10, { sameWidth: true });
      const result = jpWrap.wrap('あaいbうc');
      expect(result).to.deep.equal(['あaいbう', 'c']);
    });
  });

  describe('isJoinable', () => {
    let jpWrap: JpWrap;

    beforeEach(() => {
      jpWrap = new JpWrap(10);
    });

    it('returns false if combined width exceeds limit', () => {
      const word1 = { width: 6, last: () => 'a', isAlphaNumeric: true, str: 'abcde' } as any;
      const word2 = { width: 5, str: 'fghij' } as any;
      expect(jpWrap.isJoinable(word1, word2)).to.equal(false);
    });

    it('returns true if last character is not ending char', () => {
      // Mock the regex for testing
      JpWrap.mockRegexForTesting();
      
      const word1 = { width: 2, last: () => '(', isAlphaNumeric: false, str: '(' } as any;
      const word2 = { width: 2, str: 'a', isAlphaNumeric: true } as any;
      expect(jpWrap.isJoinable(word1, word2)).to.equal(true);
    });

    it('returns false if breakAll is true', () => {
      jpWrap.breakAll = true;
      const word1 = { width: 2, last: () => 'a', isAlphaNumeric: true, str: 'a' } as any;
      const word2 = { width: 2, str: 'b', isAlphaNumeric: true } as any;
      expect(jpWrap.isJoinable(word1, word2)).to.equal(false);
    });

    it('returns true if both words are alphanumeric', () => {
      const word1 = { width: 2, last: () => 'a', isAlphaNumeric: true, str: 'a' } as any;
      const word2 = { width: 2, str: 'b', isAlphaNumeric: true } as any;
      expect(jpWrap.isJoinable(word1, word2)).to.equal(true);
    });

    it('returns true if second word is not starting char', () => {
      const word1 = { width: 2, last: () => 'あ', isAlphaNumeric: false, str: 'あ' } as any;
      const word2 = { width: 2, str: '、', isAlphaNumeric: false } as any;
      expect(jpWrap.isJoinable(word1, word2)).to.equal(true);
    });

    it('returns false if second word is starting char', () => {
      const word1 = { width: 2, last: () => 'あ', isAlphaNumeric: false, str: 'あ' } as any;
      const word2 = { width: 2, str: 'い', isAlphaNumeric: false } as any;
      expect(jpWrap.isJoinable(word1, word2)).to.equal(false);
    });
  });
});
