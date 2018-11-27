const { handler } = require('./index');

describe('handler', () => {
  test('returns error obj if invalid data', () => {
    const data = {};

    const res = handler(data);

    expect(res).toEqual({ statusCode: 400, message: 'no data' });
  });
});
