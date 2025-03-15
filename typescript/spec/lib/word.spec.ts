import { expect } from 'chai';
import { Word } from '../../src/lib/word';

describe('Word', () => {
  describe('constructor', () => {
    it('creates a Word with empty string', () => {
      const word = new Word();
      expect(word.str).to.equal('');
      expect(word.width).to.equal(0);
      expect(word.isAlphaNumeric).to.equal(false);
      expect(word.lbStr).to.equal(null);
    });

    it('creates a Word with ASCII string', () => {
      const word = new Word('abc');
      expect(word.str).to.equal('abc');
      expect(word.width).to.equal(3);
      expect(word.isAlphaNumeric).to.equal(true);
      expect(word.lbStr).to.equal(null);
    });

    it('creates a Word with Japanese string', () => {
      const word = new Word('あいう');
      expect(word.str).to.equal('あいう');
      expect(word.width).to.equal(6);
      expect(word.isAlphaNumeric).to.equal(false);
      expect(word.lbStr).to.equal(null);
    });

    it('creates a Word with mixed string', () => {
      const word = new Word('あa');
      expect(word.str).to.equal('あa');
      expect(word.width).to.equal(3);
      expect(word.isAlphaNumeric).to.equal(true);
      expect(word.lbStr).to.equal(null);
    });

    it('creates a Word with sameWidth option', () => {
      const word = new Word('あa', { sameWidth: true });
      expect(word.str).to.equal('あa');
      expect(word.width).to.equal(4);
      expect(word.isAlphaNumeric).to.equal(true);
      expect(word.lbStr).to.equal(null);
    });

    it('creates a Word with regexs option', () => {
      const regexs = [
        { pattern: /a/, width: 3 }
      ];
      const word = new Word('あa', { regexs });
      expect(word.str).to.equal('あa');
      expect(word.width).to.equal(5);
      expect(word.isAlphaNumeric).to.equal(true);
      expect(word.lbStr).to.equal(null);
    });
  });

  describe('last', () => {
    it('returns the last character', () => {
      const word = new Word('abc');
      expect(word.last()).to.equal('c');
    });

    it('returns undefined for empty string', () => {
      const word = new Word('');
      expect(word.last()).to.be.undefined;
    });
  });

  describe('ltrim', () => {
    it('removes leading spaces', () => {
      const word = new Word('  abc');
      word.ltrim();
      expect(word.str).to.equal('abc');
      expect(word.width).to.equal(3);
    });

    it('removes leading full-width spaces when fullWidthSpace is true', () => {
      const word = new Word('　abc');
      word.ltrim(true);
      expect(word.str).to.equal('abc');
      expect(word.width).to.equal(3);
    });

    it('does not remove leading full-width spaces when fullWidthSpace is false', () => {
      const word = new Word('　abc');
      word.ltrim(false);
      expect(word.str).to.equal('　abc');
      expect(word.width).to.equal(5);
    });
  });

  describe('append', () => {
    it('appends another Word', () => {
      const word1 = new Word('abc');
      const word2 = new Word('def');
      word1.append(word2);
      expect(word1.str).to.equal('abcdef');
      expect(word1.width).to.equal(6);
      expect(word1.isAlphaNumeric).to.equal(true);
    });

    it('throws an error if the Word has a line break', () => {
      const word1 = new Word('abc');
      word1.appendLineBreak('\n');
      const word2 = new Word('def');
      expect(() => word1.append(word2)).to.throw('hasLineBreak');
    });
  });

  describe('appendText', () => {
    it('appends text', () => {
      const word = new Word('abc');
      word.appendText('def');
      expect(word.str).to.equal('abcdef');
      expect(word.width).to.equal(6);
      expect(word.isAlphaNumeric).to.equal(true);
    });
  });

  describe('appendLineBreak', () => {
    it('appends a line break', () => {
      const word = new Word('abc');
      word.appendLineBreak('\n');
      expect(word.str).to.equal('abc');
      expect(word.lbStr).to.equal('\n');
      expect(word.isAlphaNumeric).to.equal(false);
    });
  });

  describe('hasStr', () => {
    it('returns true if the Word has a string', () => {
      const word = new Word('abc');
      expect(word.hasStr()).to.equal(true);
    });

    it('returns false if the Word has an empty string', () => {
      const word = new Word('');
      expect(word.hasStr()).to.equal(false);
    });
  });

  describe('hasLineBreak', () => {
    it('returns true if the Word has a line break', () => {
      const word = new Word('abc');
      word.appendLineBreak('\n');
      expect(word.hasLineBreak()).to.equal(true);
    });

    it('returns false if the Word does not have a line break', () => {
      const word = new Word('abc');
      expect(word.hasLineBreak()).to.equal(false);
    });
  });

  describe('widthByStr', () => {
    it('calculates the width of ASCII string', () => {
      expect(Word.widthByStr('abc')).to.equal(3);
    });

    it('calculates the width of Japanese string', () => {
      expect(Word.widthByStr('あいう')).to.equal(6);
    });

    it('calculates the width of mixed string', () => {
      expect(Word.widthByStr('あa')).to.equal(3);
    });

    it('calculates the width with sameWidth option', () => {
      expect(Word.widthByStr('あa', { sameWidth: true })).to.equal(4);
    });

    it('calculates the width with regexs option', () => {
      const regexs = [
        { pattern: /a/, width: 3 }
      ];
      expect(Word.widthByStr('あa', { regexs })).to.equal(5);
    });
  });
});
