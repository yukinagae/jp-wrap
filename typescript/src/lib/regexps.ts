import characterClasses from './character-classes';

export interface Regexps {
  notStartingChars: RegExp;
  notEndingChars: RegExp;
  notStartingCharsHalf: RegExp;
}

const regexps: Regexps = {
  notStartingChars: new RegExp([
    '[',
    characterClasses['Closing brackets'],
    characterClasses['Hyphens'],
    characterClasses['Dividing punctuation marks'],
    characterClasses['Middle dots'],
    characterClasses['Full stops'],
    characterClasses['Commas'],
    characterClasses['Iteration marks'],
    characterClasses['Prolonged sound mark'],
    characterClasses['Small kana'],
    ']'
  ].join('')),

  notEndingChars: new RegExp([
    '[',
    characterClasses['Opening brackets'],
    ']'
  ].join('')),

  notStartingCharsHalf: new RegExp([
    '[',
    characterClasses['Closing brackets'],
    characterClasses['Hyphens'],
    characterClasses['Dividing punctuation marks'],
    characterClasses['Middle dots'],
    characterClasses['Full stops'],
    characterClasses['Commas'],
    characterClasses['Iteration marks'],
    characterClasses['Prolonged sound mark'],
    characterClasses['Small kana'],
    characterClasses['Closing brackets HANKAKU'],
    characterClasses['Middle dots HANKAKU'],
    characterClasses['Full stops HANKAKU'],
    characterClasses['Commas HANKAKU'],
    characterClasses['Prolonged sound mark HANKAKU'],
    characterClasses['Small kana HANKAKU'],
    ']'
  ].join(''))
};

export default regexps;
