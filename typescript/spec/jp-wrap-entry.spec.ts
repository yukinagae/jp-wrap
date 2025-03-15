import { expect } from 'chai';
import jpWrap from '../src/jp-wrap-entry';
import { JpWrap } from '../src/lib/jp-wrap';

describe('jp-wrap-entry', () => {
  it('exports a function', () => {
    expect(jpWrap).to.be.a('function');
  });

  it('exports JpWrap class', () => {
    expect(jpWrap.JpWrap).to.equal(JpWrap);
  });

  describe('with width only', () => {
    it('wraps text with specified width', () => {
      const wrap = jpWrap(10);
      const result = wrap('abcdefghijklmnopqrstuvwxyz');
      expect(result).to.equal('abcdefghij\nklmnopqrst\nuvwxyz');
    });

    it('wraps Japanese text with specified width', () => {
      const wrap = jpWrap(10);
      const result = wrap('あいうえおかきくけこさしすせそ');
      expect(result).to.equal('あいうえお\nかきくけこ\nさしすせそ');
    });
  });

  describe('with start and stop', () => {
    it('wraps text with padding', () => {
      const wrap = jpWrap(2, 10);
      const result = wrap('abcdefghijklmnopqrstuvwxyz');
      expect(result).to.equal('  abcdefgh\n  ijklmnop\n  qrstuvwx\n  yz');
    });
  });

  describe('with options', () => {
    it('wraps text with trim option', () => {
      const wrap = jpWrap(10, { trim: true });
      const result = wrap('abc\ndef\nghi');
      expect(result).to.equal('abcdefghi');
    });

    it('wraps text with breakAll option', () => {
      const wrap = jpWrap(10, { breakAll: true });
      const result = wrap('abcdefghijklmnopqrstuvwxyz');
      expect(result).to.equal('abcdefghij\nklmnopqrst\nuvwxyz');
    });

    it('wraps text with half option', () => {
      const wrap = jpWrap(10, { half: true });
      const result = wrap('あいうえお)かきくけこ');
      expect(result).to.equal('あいうえお)\nかきくけこ');
    });

    it('wraps text with fullWidthSpace option', () => {
      const wrap = jpWrap(10, { fullWidthSpace: true });
      const result = wrap('　あいうえおかきくけこ');
      expect(result).to.equal('あいうえお\nかきくけこ');
    });

    it('wraps text with sameWidth option', () => {
      const wrap = jpWrap(10, { sameWidth: true });
      const result = wrap('あaいbうc');
      expect(result).to.equal('あaいb\nうc');
    });
  });
});
