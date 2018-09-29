 const expect = require('expect');

 const {generateMessage, generateLocationMessage} = require('./message');

 describe('generateMessage', () => {
   it('should generate correct message object', () => {
     const from = 'Akkiro';
     const text = 'Hi everyone';
     const res = generateMessage(from, text);
     expect(res.from).toBe(from);
     expect(res.text).toBe(text);
     expect(res.createdAt).toBeA('number');
     expect(res).toInclude({ from, text });
   });
 });

describe('generateLocationMessage', () => {
  it('should generate coorect location object', () => {
    const from = 'Akkiro';
    const latitude = 1;
    const longitude = 2;
    const res = generateLocationMessage(from, latitude, longitude);
    expect(res.from).toBe(from);
    expect(res.url).toBe('https://www.google.com/maps?q=1,2');
    expect(res.createdAt).toBeA('number')
  });
});
