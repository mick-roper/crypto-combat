const { handler } = require('./index');
const { mutate } = require('./mutator');

jest.mock('./mutator');

describe('handler', () => {
  test('returns 200 with a valid payload', () => {
    const p1 = 'abc';
    const p2 = '123';
    const mutagen = 0;
    const event = {
      message: JSON.stringify({ p1, p2, mutagen }),
    };
    const mergeResult = { c1: 'abc', c2: 'def' };

    mutate.mockImplementation((a, b, c) => {
      expect(a).toEqual(p1);
      expect(b).toEqual(p2);
      expect(c).toEqual(mutagen);
      return mergeResult;
    });

    const { statusCode, body } = handler(event);
    const data = JSON.parse(body);

    expect(statusCode).toEqual(200);
    expect(data).toEqual(mergeResult);
  });

  test('returns 200 with a valid payload', () => {
    const p1 = 'abc';
    const p2 = '123';
    const mutagen = 0;
    const event = {
      message: JSON.stringify({ p1, p2, mutagen }),
    };
    const mergeResult = { c1: 'abc', c2: 'def' };

    mutate.mockImplementation((a, b, c) => {
      expect(a).toEqual(p1);
      expect(b).toEqual(p2);
      expect(c).toEqual(mutagen);
      return mergeResult;
    });

    const { statusCode, body } = handler(event);
    const data = JSON.parse(body);

    expect(statusCode).toEqual(200);
    expect(data).toEqual(mergeResult);
  });
});
