const expect = require('expect');

const {isRealString} = require('./validation');

describe('validation', () => {
  it('should return true on valid string', () => {
    expect(isRealString('Ak')).toBe(true);
  });
  it('should return false on invalid string', () => {
    expect(isRealString('   ')).toBe(false);
  });
});
