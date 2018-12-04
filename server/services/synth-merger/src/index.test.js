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

  describe('validation', () => {
    const testCases = [
      {
        name: 'no p1 property',
        args: {
          p2: 'abc',
          mutagen: 0,
        },
        expectedBody: 'no p1 property',
      },
      {
        name: 'no p1 property',
        args: {
          p1: 'abc',
          mutagen: 0,
        },
        expectedBody: 'no p2 property',
      },
    ];

    testCases.forEach((t) => {
      test(t.name, () => {
        const event = {
          message: JSON.stringify(t.args),
        };

        const { statusCode, body } = handler(event);

        expect(statusCode).toEqual(400);
        expect(body).toEqual(t.expectedBody);
      });
    });
  });
});
