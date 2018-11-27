const { createSynth } = require('./processor');
const { handler } = require('./index');

jest.mock('./processor');

describe('handler', () => {
  test('returns error obj if invalid data', () => {
    const data = {};

    const res = handler(data);

    expect(res).toEqual({ statusCode: 400, message: 'no data' });
  });

  test('returns OK response', () => {
    const event = {
      body: JSON.stringify({ hello: 'world' }),
    };

    const data = {};

    createSynth.mockImplementation(() => data);

    const res = handler(event);

    expect(res).toEqual({ statusCode: 200, data });
  });
});
