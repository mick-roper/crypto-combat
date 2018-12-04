const { mutate } = require('./mutator');

describe('mutate', () => {
  test('returns valid responses', () => {
    const p1 = '';
    const p2 = '';
    const m = 0.0034;

    const { c1, c2 } = mutate(p1, p2, m);

    expect(c1).toEqual('');
    expect(c2).toEqual('');
  });
});
