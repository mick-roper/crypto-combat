const crypto = require('crypto');
const { createSynth } = require('./processor');

jest.mock('crypto');

describe('createSynth', () => {
  test('returns a valid object', () => {
    const obj = {
      trainerId: 'hello-world',
    };
    const hash = 'abc';

    crypto.createHash.mockImplementation(() => ({
      update: () => {},
      digest: () => hash,
    }));

    const item = createSynth(obj);

    expect(item).toEqual({ generation: 0, attrHash: hash });
  });
});
